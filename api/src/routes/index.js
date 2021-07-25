const express = require('express')
const router = express.Router()

const containers = require('./containers')
const items = require('./items')
const rooms = require('./rooms')

router.use('/containers', containers)
router.use('/items', items)
router.use('/rooms', rooms)

module.exports = router
