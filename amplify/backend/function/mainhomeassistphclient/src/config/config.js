require('dotenv').config()

// Setting up the database connection
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        charset  : 'utf8'
    }
})

const bookshelf = require('bookshelf')(knex)

module.exports.bookshelf = bookshelf
