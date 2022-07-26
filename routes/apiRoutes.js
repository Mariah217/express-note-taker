const router = require('express').Router()

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


module.exports=router