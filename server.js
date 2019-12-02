const express = require('express')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))

app.get('/', (req, res) => res.send('API running'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
