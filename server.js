require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const mongooseLogger = require('mongoose-morgan')
const cors = require('cors')
const path = require('path')
const connectDB = require('./db/mongoose')

const app = express()

connectDB()

app.use(cors())
app.use(logger('dev'))
app.use(
  mongooseLogger(
    {
      connectionString: `${process.env.MONGO_URI}`,
    },
    {
      skip: (req, res) => res.statusCode < 400,
    }
  )
)
app.use(express.json())
app.use('/api/products', require('./routes/api/products'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
