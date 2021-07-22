const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

// Constrent function to get the book of this author
authorSchema.pre('remove', function(next) {
    Book.find({author: this.id }, (err, books) =>{
        if(err) {
            next(err)
        } else if (books.lenght > 0) {
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)