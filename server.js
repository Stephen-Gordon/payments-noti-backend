const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require("cors");
const app = express()
const port = 3002
require('dotenv').config();
require('./configs/db.js')()
app.use(cors());
app.use(express.json())

app.set('view engine', 'html')
// serve the views 
app.use(express.static(__dirname + '/views'))


app.use((req, res, next) => {
    console.log(req.user)
    return next()
})
/* Requests */


app.use('/api/users', require('./routes/users.js'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
