const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();
require('./configs/db.js')()

app.use(express.json())


/* Requests */


/* Middleware */
app.use('/api/users', require('./routes/users.js'))

app.use('/api/festivals', require('./routes/festivals.js'))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
