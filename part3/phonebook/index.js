const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')
morgan.token('body', (req, resp) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

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




app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const reqId = request.params.id
    const targetPerson = persons.find(p => p.id === Number(reqId))
    if (targetPerson) {
        response.json(targetPerson)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const reqBody = request.body
    if (!reqBody.name || !reqBody.number) {
        return response.status(400).json({
            error: "Bad Request: missing name or number!"
        })
    }

    if (persons.find(p => p.name === reqBody.name)) {
        return response.status(400).json({
            error: "Bad Request: This name exists!"
        })
    }

    const addedPerson = {
        id: Math.floor(Math.random() * 1000),
        name: reqBody.name,
        number: reqBody.number
    }
    persons = persons.concat(addedPerson)

    response.json(addedPerson)
})


app.delete('/api/persons/:id', (request, response) => {
    const reqId = Number(request.params.id)
    const targetPerson = persons.find(p => p.id === reqId)
    if (targetPerson) {
        persons = persons.filter(p => p.id !== reqId)
        console.log(`after delete: ${persons}`);
        response.json(targetPerson)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const totalPerson = persons.length
    const respText = `phonebook has info for ${totalPerson} people`
    const currentDateTime = new Date()
    response.send(`<div>${respText}<div/>`.concat(`<div>${currentDateTime}<div/>`))
})


const unknownEndPoint = (request, response) => {
    console.log("unknown endpoint");
    response.status(404).send("unknown endpoint")
}

app.use(unknownEndPoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
