const express = require('express')
const bodyParser = require('body-parser')
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

app.get('/item', async (req, res) => {
  let pageSize = 10
  let page = 0

  if (req.query.page) {
    page = req.query.page
  }

  const fetchPageOptions = { pageSize, page };

  try {
    const response = await new Post()
    .query({ where: { post_status: 'publish', post_type: 'cf47rs_property'} })
    .orderBy('post_modified', 'DESC')
    .fetchPage({ ...fetchPageOptions, withRelated: ['propertyRelation'] })

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
    // console.log(parentTerms)

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
      if (!termRelation) {
        return r
      }
      // set the location field
      let location = null
      termRelation.forEach(t => {
        if (t.taxonomy !== 'cf47rs_property_location') {
          return;
        }
        // subcity
        location = `${t.term.name}, ${t.parent.term.name}`
      })
      // set image thumbnail
      let thumbnail = null
      const postThumb = postThumbnails.find(p => p.post_parent === r.ID)
      if (postThumb) {
        thumbnail = postThumb.guid.replace('.jpg', '-554x360-c-center.jpg')
      }
      
      return { ...r, location, thumbnail, termRelation }
    })
    
    res.json({ result, ...response.pagination })
  } catch (err) {
    console.log('err', err)
    res.status(500).send(err)
  }


  // try {
  //   await new TermRelationship()
  //   .query('where', 'object_id', 'in', [1645])
  //   // .query(qb => {
  //   //   qb.whereIn('object_id',  [1645]);
  //   // })
  //   // .properties()
  //   // .fetchAll({ withRelated: ['properties'] })
  //   .fetchAll({ debug: true })
  //   // .fetchPage(fetchPageOptions)
  //   .then(result => {
  //     res.json({ result });
  //   });
  // } catch (err) {
  //   console.log(err)
  //   res.json(err)
  // }

  // try {
  //   await new Term()
  //   .query('where', 'term_id', 'in', [210, 136])
  //   .fetchAll({ withRelated: ['termTaxonomy'] })
  //   .then(result => {
  //     res.json({ result });
  //   });
  // } catch (err) {
  //   res.status(500).json(err)
  // }



  // try {
  //   new TermTaxonomy()
  //     .query('where', 'term_id', 'in', [210, 136])
  //     // .fetchAll({ withRelated: ['term', 'termRelation'] })
  //     .fetchPage({ ...fetchPageOptions, withRelated: ['term', 'termRelation'] })
  //     .then(result => {
  //     res.json({ result });
  //   });
  // } catch (err) {
  //   res.status(500).json(err)
  // }

  // new TermTaxonomy()
  //     .query('where', 'term_id', 'in', [210, 136])
  //     .fetchAll({ withRelated: ['term', 'termRelation'] })
  //     // .fetchPage(fetchPageOptions)
  //     .then(result => {
  //     res.json({ result });
  //   });

})

app.listen(5000, () => {
    console.log("app running on port http://localhost:5000")
})

module.exports = app
