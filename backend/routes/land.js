const express = require("express");
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await req.models.land.createNewLand(body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Failed to create land:", err);
        res.status(500).json({message: err.toString()});
    }
    next();
});

router.get('/', async (req, res, next) => {
    try {
        const query = req.query;
        const results = await req.models.land.getLand(query);
        res.status(200).json(results);
    } catch (err) {
        console.error("Failed to get land:", err);
        res.status(500).json({message: err.toString()});
    }
    next();
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const result = await req.models.land.updateLand(id, body);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to edit land:', err);
        res.status(500).json({ message: err.toString()});
    }
    next();
});

module.exports = router;