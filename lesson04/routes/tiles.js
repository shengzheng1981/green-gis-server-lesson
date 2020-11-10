const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const schema = require('../core/schema');

//矢量切片
router.get('/vector/:name/:x/:y/:z', async (req, res, next) => {
    try {
        const model = schema.model(req.params.name);
        const x = parseInt(req.params.x), y = parseInt(req.params.y), z = parseInt(req.params.z);
        const query =  {};
        query['zooms.' + z + '.tileMin.tileX'] = {'$lte': x };
        query['zooms.' + z + '.tileMin.tileY'] = {'$lte': y };
        query['zooms.' + z + '.tileMax.tileX'] = {'$gte': x };
        query['zooms.' + z + '.tileMax.tileY'] = {'$gte': y };
        const features = await model.find(query).select('-zooms').lean()
        res.status(200);
        res.json(features);
    } catch (err) {
        res.status(500);
        res.json(err.message);
    }
});

module.exports = router;