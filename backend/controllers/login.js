const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
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

  response.status(200).send({ id: user.id, admin: user.admin })
})

router.post('/verify-2fa', async (req, res) => {
  const { userId, token } = req.body

  if (!userId || !token) {
    res.status(400).json({ message: 'Missing userId or token' });
  }

  const user = await User.findById(userId)
  
  if (!user) {
    res.status(400).json({ message: 'User not found' });
  }

  console.log('User Secret:', user.secret);
  console.log('User name:', user.name);
  console.log('Token Provided:', token);

  const isVerified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: 'base32',
    token,
    window: 1
  });

  console.log('Is Verified:', isVerified);

  if (!isVerified) {
    res.status(400).json({ message: 'Invalid token' });
  }

  const userForToken = {
    phone: user.phone,
    id: user._id,
    admin: user.admin
  }

  const token2Sign = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token: token2Sign, id: user.id, admin: user.admin })
});

module.exports = router