const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./utils/config')
const mongoose = require('mongoose')
require('express-async-errors');
const app = express();

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(morgan('tiny'));
app.use(express.static('build'))
app.use(express.json())

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
    }
)
