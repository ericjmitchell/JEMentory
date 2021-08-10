const express = require('express')
const router = express.Router()

const users = require('./users')
const family = require('./family')
const items = require('./items')

router.use('/users', users)
router.use('/families', family)
router.use('/items', items)

module.exports = router
