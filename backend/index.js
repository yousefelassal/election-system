const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./util/config')
const mongoose = require('mongoose')
require('express-async-errors');
const app = express();

const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const candidateRouter = require('./controllers/candidates');
const votingRouter = require('./controllers/voting');
const statsRouter = require('./controllers/stats');

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
app.use(express.json())

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/candidates', candidateRouter);
app.use('/api/voting', votingRouter);
app.use('/api/stats', statsRouter);

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
    }
)
