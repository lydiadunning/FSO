import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const DeleteButton = ({ deleteEntry }) => <button onClick={deleteEntry}>delete</button>

const Person = ({ person, deleteEntry }) => <p>{person.name} {person.number} <DeleteButton deleteEntry={() => deleteEntry(person.id)}/> </p>

const personSearch = (persons, searchTerm) => 
  persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

const ShowPersons = ({ persons, searchTerm, deleteEntry }) => {
    const filtered = personSearch(persons, searchTerm)
    return (
      filtered.map(person => <Person key={person.name} person={person} deleteEntry={deleteEntry} />)
    )
  }

const Form = ({ submitHandler, nameHandler, numberHandler, name, number }) => {
  return (
  <form style={{margin: 10}} onSubmit={submitHandler}>
    <div>
      name: <input value={name} onChange={nameHandler} />
      <br/>
      number: <input value={number} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Message = ({ message }) => {
  if (!message) {
    return (<></>)
  }
  const color = message.isError ? 'red' : 'green'
  const messageStyle = {
    borderColor: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <span style={messageStyle}>
      {message.message}
    </span>
  )
}


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  // message should look like: {message: string, error: boolean}

  useEffect(() => {
    personService.getAll().then(persons =>
      setPersons(persons))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    if (!foundPerson) {
      personService
        .create({name: newName, number: newNumber})
        .then(returnedEntry => setPersons([...persons, returnedEntry]))
        setMessage(
          {
            message: `${newName} has been added to the phonebook`,
            isError: false
          }
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    } else if (foundPerson.number !== newNumber) {
      window.confirm(`${newName} is already in the phonebook, replace the old number with ${newNumber}?`); {
        personService
          .update(foundPerson.id, {name: newName, number: newNumber})
          .then(returnedEntry => setPersons(persons.map(person => person.id != foundPerson.id ? person : returnedEntry)))
          .catch(error => {
            console.log('error caught')
            setMessage({message: `${newName} was removed from the server`, isError: true})
          })
      }
    } else {
      setMessage(
        {
          message: `${newName} is already in the phonebook`,
          isError: true
        }
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteEntry = id => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteEntry(id)
        .then(returnedSuccess => {
          setPersons(persons.filter(person => person.id != id))
        }).catch(error => {
          setMessage(`${name} has already been removed`)
        })
    }
  }

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }
  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }
  const searchHandler = (event) => {
    setSearchTerm(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <div style={{margin: 10}}>
        filter shown with <input value={searchTerm} onChange={searchHandler}/>
      </div>
      <Form submitHandler={addName} nameHandler={nameChangeHandler} numberHandler={numberChangeHandler} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <ShowPersons persons={persons} searchTerm={searchTerm} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App