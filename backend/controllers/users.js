const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (request, response) => {
  const { phone, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    phone,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

router.post('/enable-2fa', async (req, res) => {
  const secret = speakeasy.generateSecret();
  const { userId } = req.body

  await User.findByIdAndUpdate(userId, { secret: secret.base32 }, { new: true })

  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) {
      res.status(500).json({ message: 'Error generating QR code' });
      return;
    }
    res.json({ secret: secret.base32, data_url });
  });
});

router.post('/verify-2fa', async (req, res) => {
  const { userId, token } = req.body
  const user = await User.findById(userId);
  
  const isVerified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: 'base32',
    token
  });

  if (isVerified) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('votedFor', { name: 1, party: 1 });
  response.json(users);
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('votedFor', { name: 1, party: 1 });
  response.json(user);
});

module.exports = router;