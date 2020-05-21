const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 3000

const uat = 'mongodb+srv://Iram:Iram@cluster0-eozbj.mongodb.net/test?retryWrites=true&w=majority'
const local = 'mongodb://localhost:27017/jobs-db'


mongoose.connect(uat, (err, res)=>{
    if(err) return console.log(`Error connecting to the database ${err}`)

    console.log('Connection to the database established')

    app.listen(PORT, ()=>{
        console.log(`API Rest running at server:${PORT}`)
    })
})
