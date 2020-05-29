const express = require('express')
const app = express()

//middleware
app.use(express.json())

//database
const db = require('./config/database')


db.authenticate()
    .then(()=> console.log('Database Connected'))
    .catch((err)=> console.log('error',err))

app.post('/',(req,res)=> {
    console.log('post')
    console.log(req.body)
    data = {
        name: 'collin',
        email: 'collin@gmail.com'
    }
    res.status(200).send(data)
})

app.use('/api',require('./routes'))

app.listen(5000,()=>{
    console.log('server stated on port 5000')
})