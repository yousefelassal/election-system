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
  const { userId, phone } = req.body
  const secret = speakeasy.generateSecret({
    length: 10,
    name: `Election System: ${phone}`,
    issuer: 'Election System'
  });

  const secretBase32 = secret.base32;

  await User.findByIdAndUpdate(userId, { secret: secretBase32 }, { new: true })

  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) {
      res.status(500).json({ message: 'Error generating QR code' });
      return;
    }
    res.json({ qr: data_url, secret: secretBase32 });
  });
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