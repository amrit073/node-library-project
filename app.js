const express = require('express')
const res = require('express/lib/response')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser');
const methods = require('./routes/methods')

app.use(bodyParser.json());
app.use(express.static('./staticfiles'))
app.use(express.urlencoded({ extended: false }))


app.use('/login', methods)

    

app.listen(5000, () => { console.log('server started at port 5000'); })
