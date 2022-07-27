const router = require('express').Router()
const fs = require('fs')
const db = require('../db/db.json')
const uuid = require('../helpers/uuid')

router.get('/api/notes', (req, res) => {
    res.json(db)
})

//add new note
router.post('/api/notes', (req, res) =>{
    console.log(req.body)
    const {title, text,}= req.body
    if (text && title){
        const newNote = {
            title,
            text,
            note_id: uuid(),
        }
        fs.readFile('./db/db.json', 'utf8', (err,data)=>{
            if (err){
                console.error(err)
            } else {
                const parsedNotes = JSON.parse(data)
                parsedNotes.push(newNote)

                fs.writeFileSync('./db/db.json', JSON.stringify(parsedNotes, null, 4), 
                (writeErr)=>
                writeErr
                ? console.error(writeErr)
                : console.info('Success')
                )
            }
        })
    }
})

module.exports = router