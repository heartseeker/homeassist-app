const { bookshelf } = require("../config/config");

const Term = bookshelf.model('Term', {
    tableName: 'wp_terms',
    idAttribute: 'term_id',
    termTaxonomy() {
        return this.hasOne('TermTaxonomy', 'term_id'); 
    }
})

module.exports.Term = Term