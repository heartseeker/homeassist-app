const { bookshelf } = require("../config/config");

const Post = bookshelf.model("Post", {
    tableName: "wp_posts",
    idAttribute: "id",
    propertyRelation() {
        return this.hasMany("TermRelationship", "object_id");
    }
})

module.exports.Post = Post
