require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(logger('dev'))
app.use(express.json())
app.use('/api/products', require('./routes/api/products'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

app.get('/', (req, res) => res.send('API running'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))