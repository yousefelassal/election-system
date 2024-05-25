const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { phone, password } = request.body

  const user = await User.findOne({ phone })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid phone or password' })
  }

  const userForToken = {
    phone: user.phone,
    id: user._id,
    admin: user.admin
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, phone: user.phone, name: user.name, admin: user.admin })
})

module.exports = router