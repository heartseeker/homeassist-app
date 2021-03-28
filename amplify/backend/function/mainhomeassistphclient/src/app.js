const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { TermRelationship } = require('./models/TermRelationship')
const { Term } = require('./models/Term')
const { Post } = require('./models/Post')
const { PostMeta } = require('./models/PostMeta')
const { TermTaxonomy } = require('./models/TermTaxonomy')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

const handlePosts = async (response) => {
  const postIds = []
  let result = response.models.map(model => {
    const row = model.serialize()
    postIds.push(row.ID)
    return row;
  });

  const propertyRelation = await new TermRelationship()
  .query(qb => {
    qb.whereIn('object_id',  postIds);
  })
  .fetchAll()
  let relationTermTaxonomy = propertyRelation.models.map(({ attributes }) => ({
    object_id: attributes.object_id,
    term_taxonomy_id: attributes.term_taxonomy_id,
  }))
  let termTaxonomyIds = []
  relationTermTaxonomy.forEach(element => {
    const exist = termTaxonomyIds.find(o => o.term_taxonomy_id === element.term_taxonomy_id)
    if (!exist) {
      termTaxonomyIds.push(element.term_taxonomy_id)
    }
  });
  termTaxonomyIds = [...new Set(termTaxonomyIds)];

  let terms = await new TermTaxonomy()
  .query('where', 'term_id', 'in', termTaxonomyIds)
  .fetchAll({ withRelated: ['term'] })
  terms = terms.models.map(m => m.serialize())
  // update term for relation
  relationTermTaxonomy = relationTermTaxonomy.map(o => {
    const term = terms.find(t => t.term_taxonomy_id === o.term_taxonomy_id)
    if (term) {
      return { object_id: o.object_id, ...term }
    }
    return o
  })

  // get parentIds
  let parentIds = []
  relationTermTaxonomy.forEach(r => {
    if (r.parent > 0) {
      parentIds.push(r.parent)
    }
  })
  // remove duplicate
  parentIds = [...new Set(parentIds)];
  let parentTerms = await new TermTaxonomy()
  .query('where', 'term_id', 'in', parentIds)
  .fetchAll({ withRelated: ['term'] })
  parentTerms = parentTerms.models.map(m => m.serialize())

  // insert the parent term to child
  relationTermTaxonomy = relationTermTaxonomy.map(r => {
    if (r.parent === 0) {
      return r
    }
    const parent = parentTerms.find(p => p.term_taxonomy_id === r.parent)
    return { ...r, parent }
  })

  let postMeta = await new PostMeta()
    .query('where', 'post_id', 'in', postIds)
    .query('where', 'meta_key', '=', '_thumbnail_id')
    .fetchAll()
    postMeta = postMeta.models.map(m => m.serialize())
  // get postThumbnailIds
  const postThumbnailIds = postMeta.map(p => +p.meta_value)

  let postThumbnails = await new Post()
  .query('where', 'id', 'in', postThumbnailIds)
  .fetchAll()
  postThumbnails = postThumbnails.models.map(m => m.serialize())

  result = result.map(r => {
    const termRelation = relationTermTaxonomy.filter(t => t.object_id === r.ID)
    let plain_post_content = r.post_content.replace(/<\/?[^>]+(>|$)/g, '');
    // remove line breaks
    plain_post_content = plain_post_content.replace(/(\r\n|\n|\r)/gm, ' ');
    // remove html entities (e.g &nbsp;)
    plain_post_content = _.unescape(plain_post_content);
    plain_post_content = plain_post_content.replace(/&nbsp;/g, ' ');
    // remove multiple spaces
    plain_post_content = plain_post_content.replace(/\s+/g, ' ').trim();
    if (!termRelation) {
      return { ...r, plain_post_content }
    }
    // set the location field
    let location = null
    termRelation.forEach(t => {
      if (t.taxonomy !== 'cf47rs_property_location') {
        return;
      }
      if (t.parent === 0) {
        return;
      }
      // subcity
      if (t.term && t.term.name && t.parent.term.name) {
        location = `${t.term.name}, ${t.parent.term.name}`
      }
    })
    // set image thumbnail
    let thumbnail = null
    const postThumb = postThumbnails.find(p => p.post_parent === r.ID)
    if (postThumb) {
      thumbnail = postThumb.guid.replace('.jpg', '-554x360-c-center.jpg')
    }
    
    return { ...r, plain_post_content, location, thumbnail, termRelation }
  })

  return { result, ...response.pagination }
}

app.get('/properties', async (req, res) => {
  // let page_size = 10
  // let page = 0
  // let q = ''
  // let property_type = null
  const searchQueries = {
    page: 0,
    page_size: 10,
    q: '',
    property_type: '',
    property_location: '',
    ...req.query,
  }

  // if (req.query.page) {
  //   page = req.query.page
  // }
  // if (req.query.pageSize) {
  //   pageSize = req.query.pageSize
  // }
  // if (req.query.q) {
  //   q = req.query.q
  // }

  try {
    ({ q, page, page_size: pageSize, property_type, property_location } = searchQueries)
    const fetchPageOptions = { pageSize, page };
    // filter property type
    let termTaxonomyProps = await new TermTaxonomy()
      .query((qb) => {
        qb.where('taxonomy', '=', 'cf47rs_property_type')
        // relation table
        qb.join('wp_terms', 'wp_terms.term_id', 'wp_term_taxonomy.term_id');
        if (property_type !== '') {
          qb.whereIn('wp_terms.slug', property_type.split(','));
        }

      })
      .fetchAll({ withRelated: ['term'] })

    const termTaxonomyPropsIds = termTaxonomyProps.map(tt => tt.attributes.term_taxonomy_id)
    // filter location
    termTaxonomyLocs = await new TermTaxonomy()
      .query((qb) => {
        qb.where('taxonomy', '=', 'cf47rs_property_location')
        // relation table
        if (property_location !== '') {
          qb.join('wp_terms', 'wp_terms.term_id', 'wp_term_taxonomy.term_id')
          qb.whereIn('wp_terms.slug', property_location.split(','))
        }
        // qb.whereIn('wp_terms.slug', ['brgy-san-miguel']);
      })
      .fetchAll({ withRelated: ['term'] })

    const termTaxonomyLocsIds = termTaxonomyLocs.map(tt => tt.attributes.term_taxonomy_id)
    // get child of city (cf47rs_property_location) 
    const updatedTermTaxonomyLocs = await new TermTaxonomy()
      .query((qb) => {
        qb.whereIn('parent', termTaxonomyLocsIds)
      })
      .fetchAll({ withRelated: ['term'] })

    const updatedTermTaxonomyPropsIds = updatedTermTaxonomyLocs.map(tt => tt.attributes.term_taxonomy_id)

    // filter property types
    let termRelations = await new TermRelationship()
      .query(function(qb) {
        qb.groupBy('object_id')
        qb.whereIn('term_taxonomy_id',  termTaxonomyPropsIds)
      })
      .fetchAll()
      
    let objectIds = []
    objectIds = termRelations.map(tr => tr.attributes.object_id)
    // filter location types
    termRelations = await new TermRelationship()
      .query(function(qb) {
        qb.groupBy('object_id')
        qb.whereIn('object_id',  objectIds)
        qb.whereIn('term_taxonomy_id',  updatedTermTaxonomyPropsIds)
      })
      .fetchAll()

    objectIds = termRelations.map(tr => tr.attributes.object_id)
    const posts = await new Post()
      .query(function(qb) {
        qb.whereIn('ID', objectIds)
        qb.where('post_status', '=', 'publish')
        qb.where('post_type', '=', 'cf47rs_property')
        // qb.where('post_title', 'LIKE', `%${q}%`)
        // qb.where(() => {
        //   this.orWhere('post_title', 'LIKE', `%${q}%`)
        //   this.orWhere('post_content', 'LIKE', `%${q}%`)
        // })
        // qb.debug(true);
        qb.where('post_content', 'LIKE', `%${q}%`)
        
      })
      .orderBy('post_modified', 'DESC')
      .fetchPage({ ...fetchPageOptions, withRelated: ['propertyRelation'] })

    const response = await handlePosts(posts)

    return res.status(200).send(response)
  } catch (err) {
    console.log('err', err)
    res.status(500).send(err)
  }
})

app.get('/property-types', async (req, res) => {
  const propertyTypes = await new TermTaxonomy()
    .query((qb) => {
      qb.where('taxonomy', '=', 'cf47rs_property_type')
    })
    .fetchAll({ withRelated: ['term'] })

  let result = propertyTypes.models.map(model => {
    const row = model.serialize()
    return row.term;
  });

  return res.send({ result })
})

app.get('/property-locations', async (req, res) => {
  const propertyLocations = await new TermTaxonomy()
    .query((qb) => {
      qb.where('taxonomy', '=', 'cf47rs_property_location')
      qb.where('parent', '=', '0')
    })
    .fetchAll({ withRelated: ['term'] })

  let result = propertyLocations.models.map(model => {
    const row = model.serialize()
    return row.term;
  });

  return res.send({ result })
})

app.listen(5000, () => {
    console.log("app running on port http://localhost:5000")
})

module.exports = app
