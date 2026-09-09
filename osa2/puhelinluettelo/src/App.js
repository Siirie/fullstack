import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebook from './services/phonebook.js'
import Notification from './components/Notification.jsx'

const Numbers = ({ persons, removeContact }) => {
  return (
    <ul>
      {persons.map(person => 
        <li key={person.name}>{person.name} {person.number}
        <button type="button" onClick={() => removeContact(person.id)}>delete</button>
        </li>
      )}
      
    </ul>
  )
}

const AddForm = ({
  addContact,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {
  return (
    <div>
      {/*tähän kontaktin lisäys kentät ja tallennusnappi */}
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)

  useEffect(() => {
     phonebook
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      return
    } 
    //else:
    const contactObject = {
      name: newName, number: newNumber
    }

    phonebook
      .addNew(contactObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccesMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccesMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Failed to add ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


 const removeContact = id => {
    const person = persons.find(person => person.id === id)
    if (!person || !window.confirm(`Delete ${person.name}?`)) {
      return
    }

    phonebook
          .remove(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
          })
          .catch(error => {
        setErrorMessage(
          `Person '${person.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  const handleNumberChange =(event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className="error"/>
      <Notification message={succesMessage} className="succes"/>
      <AddForm {...{ addContact, newName, handleNameChange, newNumber, handleNumberChange }} />
      <h2>Numbers</h2>
      <Numbers persons={persons} removeContact={removeContact}/>
    </div>
  )

}

export default App