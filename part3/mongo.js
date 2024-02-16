// naming a reference to mongoose
const mongoose = require('mongoose')

// what is process? what is process.argv?
if(process.argv.length < 3) {
    console.log('please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} 

const password = process.argv[2]

const url = `mongodb+srv://mongoUser:${password}@cluster0.xch6lol.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

let successMessage = ''
if (process.argv.length > 3) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')
                const person = new Person({
                    name: process.argv[3],
                    number: process.argv[4] || null
                })
                successMessage = `Added ${process.argv[3]} to phonebook`
                return person.save()
        })
        .then(() => {
            console.log(successMessage)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
} else {
    console.log('phonebook:')
    mongoose
    .connect(url)
    .then(Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }))
    .catch((err) => console.log(err))
}
