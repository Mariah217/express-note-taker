const express=require('express')
const fs = require ('fs')
const app = express()
const PORT = 3001
const path = require('path')
const db = require('./db/db.json')

app.use(express.json());
app.use(express.static('public'))

//home page
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//notes page
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req,res) => {
    const notes = JSON.stringify(db)
    res.send(notes)
})

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT} http://localhost:${PORT}`)
})

//add new note
app.post('/api/notes',(req,res)=>{
    const {title, text} = req.body
    console.log(req.body)
    if (title !="" && text !="") {
        const newNote ={
            title,
            text
        }
        db.push(newNote);
        const newNoteString = JSON.parse(newNote)
        fs.writeFileSync('./db/db.json', newNoteString)
        console.log('success')
    }
}) 


