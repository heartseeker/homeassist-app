const { bookshelf } = require("../config/config");

const PostMeta = bookshelf.model("PostMeta", {
    tableName: "wp_postmeta",
})

module.exports.PostMeta = PostMeta
