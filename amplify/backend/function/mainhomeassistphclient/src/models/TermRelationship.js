const { bookshelf } = require("../config/config");

const TermRelationship = bookshelf.model('TermRelationship', {
    tableName: 'wp_term_relationships',
    termsTaxonomy() {
        return this.belongsTo('TermTaxonomy', 'term_taxonomy_id')
    },
    // properties() {
    //   return this.belongsToMany('Property')
    // }
})

module.exports.TermRelationship = TermRelationship
