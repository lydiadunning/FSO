require('dotenv').config();
const mongoose = require('mongoose')

const password = process.env.MONGODB_URI

const url = `mongodb+srv://mongoUser:${password}@cluster0.xch6lol.mongodb.net/?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema ({
    name: String,
    number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)