const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const path = require("path");
const db = require("./db/db.json");
const uuid = require("./helpers/uuid");

//Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.send(db);
});

//add new note
app.post("/api/notes", (req, res) => {
    const { title, text, } = req.body;
    if (title != "" && text != "") {
        const newNote = {
            id: uuid(),
            title,
            text
        }
        db.push((newNote));
        const noteString = JSON.stringify(db, null, 4)

        fs.writeFile("./db/db.json", noteString, (err) =>
            err
                ? console.error(err)
                : console.log("Success")
        )
    }
    res.json(db)
})

//delete note
// app.delete("/api/notes/:id", (req, res)=>{
//     const notes = JSON.parse(fs.readFileSync("./db/db.json"));
//     const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
//     fs.writeFileSync("./db/db.json", JSON.stringify(delNote, null, 4));
//     res.json(delNote);
// })

//wild card
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () => {
    console.log("App is listening on port http://localhost:" + PORT)
})
