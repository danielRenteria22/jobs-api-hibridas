const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 3000

const uat = 'mongodb+srv://alonsowb13:41aMlZBI2Ihji96A@testdatabase-axcki.mongodb.net/test?retryWrites=true&w=majority'
const local = 'mongodb://localhost:27017/jobs-db'

mongoose.connect(local, (err, res)=>{
    if(err) return console.log(`Error connecting to the database ${err}`)

    console.log('Connection to the database established')

    app.listen(PORT, ()=>{
        console.log(`API Rest running at http://localhost:${PORT}`)
    })
})
