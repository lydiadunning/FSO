require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', function getData (request) {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (request, response) => {
  response.send('<h1>Phonebook<h1>')
})

app.get('/api/persons', (request, response) => {
  console.log('loading persons')
  Entry.find({}).then(entries => {
    response.json(entries)
  })
})

app.get('/info', (request, response) => {
  Entry.estimatedDocumentCount().then(count => {
    response.send(
      `<p>Phonebook has info for ${count} people</p> <p>${Date()}</p>`
    )
  }).catch(error => console.error(error))
})

app.get('/api/persons/:id', (request, response) => {
  Entry.findById(request.params.id).then(entry => {
    response.json(entry)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(result => {
      return response.status(204).end()
    })
    .catch(error => errorHandler(error, request, response, next))
})

app.post('/api/persons', (request, response, next) => {
  console.log('in the post')
  const body = request.body

  const person = new Entry({
    name: body.name,
    number: body.number
  })
  console.log('person', person)
  person.save().then(savedEntry => {
    console.log('.then executed')
    response.json(savedEntry)
  })
    .catch(error => {
      console.log('error caught')
      // console.log(error.response.data.error)
      errorHandler(error, request, response, next)
    })
  console.log('end of post')
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log('In the put')
  Entry.findOneAndUpdate(
    { name: request.body.name },
    { number: request.body.number },
    { runValidators: true }
  )
    .then(updatedEntry => {
      console.log('.then executed')
      response.json(updatedEntry)
    })
    .catch(error => {
      console.log('error caught')
      console.log('error: ', error)
      errorHandler(error, request, response, next)
    })
  console.log('end of put')
})

const PORT = process.env.Port || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('error handler response: ', error.message)
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(unknownEndpoint)
app.use(requestLogger)
app.use(errorHandler)
