require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(logger('dev'))

app.get('/', (req, res) => res.send('API running'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
