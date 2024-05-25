const router = require('express').Router()
const Candidate = require('../models/candidate')

router.get('/', async (request, response) => {
    const results = await Candidate.aggregate([
        {
            $group: {
                _id: null,
                totalVotes: { $sum: '$votes' }
            }
        }
    ])

    const totalVotes = results[0].totalVotes
    const candidates = await Candidate.find({})
    const candidatesWithPercentages = candidates.map(candidate => {
        const percentage = (candidate.votes / totalVotes) * 100
        return {
            ...candidate.toJSON(),
            percentage
        }
    })

    response.json(candidatesWithPercentages)
});

module.exports = router;