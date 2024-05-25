const router = require('express').Router()
const { tokenExtractor } = require('../middleware')
const Candidate = require('../models/candidate')
const User = require('../models/user')

router.put('/:id', tokenExtractor, async (request, response) => {
    const candidate = await Candidate.findById(request.params.id)
    const user = await User.findById(request.decodedToken.id)

    if (!candidate || !user) {
        return response.status(404).json({ error: 'candidate or user not found' })
    }

    if (user.votedFor) {
        return response.status(400).json({ error: 'user has already voted' })
    }

    user.votedFor = candidate._id
    await user.save()

    candidate.votes = candidate.votes + 1
    await candidate.save()

    response.json(candidate)
});

router.delete('/reset', tokenExtractor, async (request, response) => {
    if (!request.decodedToken.admin) {
        return response.status(401).json({ error: 'only admins can reset votes' })
    }

    User.updateMany({}, { $set: { votedFor: null } })

    Candidate.updateMany({}, { $set: { votes: 0 } })

    response.status(204).end();
});

module.exports = router;