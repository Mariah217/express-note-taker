const { randomUUID } = require('crypto')
const express = require('express')
const fs = require ('fs')
const app = express()
const PORT = 3001
const path = require('path')
const db = require('./db/db.json')
const uuid = require('./helpers/uuid')

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//home page
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//notes page
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req,res) => res.send(db))

//add new note
app.post('/api/notes',(req,res)=>{
    const {title, text} = req.body
    console.log(req.body)
    if (title !="" && text !="") {
        const newNote ={
            title,
            text,
            note_id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            if (err) {
                console.error(err)
            } else {
                const parsedNotes = JSON.parse(data)
            
                parsedNotes.push(newNote)
                fs.writeFileSync('./db/db.json', JSON.stringify(parsedNotes, null, 4),(writeErr)=>
                writeErr
                ? console.error(writeErr)
                : console.info('Success'))
            }
           //need to find a way to save note without refreshing page
        })
    }
})

    app.get('/')

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT} http://localhost:${PORT}`)
})


