require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')

const app = express()


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name ==='ValidationError'){
        return response.status(400).send({error: error.message})
    }

    next(error)
}


app.use(express.static('build'))

//use express json-parser 
app.use(express.json())
app.use(cors())
app.use(requestLogger)



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1><p>Tiff is cute</p>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes =>{
        response.json(notes)
        console.log(notes)
    })
})


app.get('/api/notes/:id', (request,response,next)=>{
    Note.findById(request.params.id).then(note=>{
        if (note) {
            response.json(note)
          } else {
            response.status(404).end()
          }
    }).catch(error => next(error))
})

app.delete('/api/notes/:id', (request,response)=>{
    Note.findByIDAndRemove(request.params.id).then(note =>{
        response.status(204).end()
    })
    .catch(error=>next(error))
})


app.post('/api/notes', (request,response,next) => {
    const body = request.body
    console.log(body.content)
    // if(!body.content){
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })
    // }

    const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote =>{
        response.json(savedNote)
    }).catch(error=>next(error))
  })

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
        response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)