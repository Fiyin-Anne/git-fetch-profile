const { getProfile } = require('./controller')
const { validateName } = require('./validation');
const express = require('express');
const router = express.Router();

router.get('/profile/',  validateName, (req, res) => {
    getProfile(req.query)
    .then(result => {
        res.status(200).json({status: result.status, message: result.message, data: result.data});
    })
    .catch(err => {
        res.status(400).json({status: 'error', message: err.message})
    })
})

module.exports = router;
