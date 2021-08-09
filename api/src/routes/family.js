const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')

const { getFamily, saveFamily, deleteFamily } = require('../controllers/family')

router.get('/:familyId', asyncHandler(getFamily))

router.post('/', asyncHandler(saveFamily))

router.delete('/:familyId', asyncHandler(deleteFamily))

module.exports = router
