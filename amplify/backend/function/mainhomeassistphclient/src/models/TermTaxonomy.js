const { bookshelf } = require("../config/config");

const TermTaxonomy = bookshelf.model('TermTaxonomy', {
    tableName: 'wp_term_taxonomy',
    idAttribute: 'term_taxonomy_id',
    term() {
        return this.belongsTo('Term', 'term_id')
    },
    termRelation() {
        return this.hasMany('TermRelationship', 'term_taxonomy_id')
    }
})

module.exports.TermTaxonomy = TermTaxonomy
