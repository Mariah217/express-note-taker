const router = require('express').Router()
const path = require('path')

//notes page
router.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//wild card/home page
router.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports=router