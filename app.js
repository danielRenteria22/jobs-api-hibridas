const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./routes/auth')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("Hola mundo from the API")
})
app.use('/auth', auth)

module.exports = app