const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
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