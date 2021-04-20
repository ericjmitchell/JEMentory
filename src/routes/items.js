const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')

const { getItem, getAllItems, saveItem, deleteItem } = require('../controllers/items')

router.get('/', asyncHandler(getAllItems))

router.get('/:itemId', asyncHandler(getItem))

router.post('/', asyncHandler(saveItem))

router.delete('/:itemId', asyncHandler(deleteItem))

module.exports = router
