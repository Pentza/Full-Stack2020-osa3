const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url =
  `mongodb+srv://pentsa:${password}@phonebook.ltm1u.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const addPerson = ( name, number ) => {
  const person = new Person({ name, number })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const listPersons = () => {
  Person.find({})
    .then(persons => {
      console.log('Phonebook:')
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
  listPersons()
} else if (process.argv.length === 5) {
  addPerson(name, number)
} else {
  console.log('invalid amount of parameters \npassword only shows phonebook listed \npassword + name and number adds person')
  process.exit(1)
}