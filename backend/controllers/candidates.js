const router = require('express').Router()
const { tokenExtractor } = require('../middleware')
const Candidate = require('../models/candidate')

router.get('/', async (request, response) => {
    const candidates = await Candidate.find({})
    response.json(candidates)
})

router.post('/', tokenExtractor, async (request, response) => {
    if (!request.decodedToken.admin) {
        return response.status(401).json({ error: 'only admins can add candidates' })
    }

    const { name, party, image } = request.body

    const candidate = new Candidate({
        name,
        party,
        image,
    })

    const savedCandidate = await candidate.save()
    response.status(201).json(savedCandidate)
})

router.put('/:id', tokenExtractor, async (request, response) => {
    if (!request.decodedToken.admin) {
        return response.status(401).json({ error: 'only admins can edit candidates' })
    }

    const { name, party, image } = request.body
    const candidate = {
        name,
        party,
        image,
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(request.params.id, candidate, { new: true })
    response.json(updatedCandidate)
})

router.delete('/:id', tokenExtractor, async (request, response) => {
    if (!request.decodedToken.admin) {
        return response.status(401).json({ error: 'only admins can delete candidates' })
    }

    await Candidate.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = router;