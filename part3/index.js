const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', function getData (request) {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook<h1>')
})

app.get('/api/persons', (request, response) => {
  console.log(JSON.stringify(persons))
    response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.send(`<p>${person.name}: ${person.number}<p>`)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name required'
    })
  } else if (persons.find(person => persons.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const id = Math.random() * 500
  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})


const PORT = process.env.Port || 8080
app.listen(PORT, '0.0.0.0')
console.log(`Server running on port ${PORT}`)

