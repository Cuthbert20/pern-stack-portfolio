require('dotenv').config()
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')

//toplevel middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is now up and listening`))

}).catch(err => console.log(err, 'database not listening to you Stu'))