const express = require('express')
const fs = require ('fs')
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')
const db = require('./db/db.json')
const uuid = require('./helpers/uuid')
const htmlRoute = require('./routes/htmlRoutes')
const apiRoute = require('./routes/apiRoutes')

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(apiRoute)
app.use(htmlRoute)

app.listen(PORT, () =>{
    console.log("App is listening on port http://localhost:"+ PORT)
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