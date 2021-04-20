const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')

const { getContainer, getAllContainers, saveContainer, deleteContainer } = require('../controllers/containers')
const { getAllItemsInContainer } = require('../controllers/items')

router.get('/', asyncHandler(getAllContainers))

router.get('/:containerId', asyncHandler(getContainer))

router.get('/:containerId/items', asyncHandler(getAllItemsInContainer))

router.post('/', asyncHandler(saveContainer))

router.delete('/:containerId', asyncHandler(deleteContainer))

module.exports = router
