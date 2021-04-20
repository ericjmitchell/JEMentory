const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')

const { getRoom, getAllRooms, saveRoom, deleteRoom } = require('../controllers/rooms')
const { getAllContainersInRoom } = require('../controllers/containers')

router.get('/', asyncHandler(getAllRooms))

router.get('/:roomId', asyncHandler(getRoom))

router.get('/:roomId/containers', asyncHandler(getAllContainersInRoom))

router.post('/', asyncHandler(saveRoom))

router.delete('/:roomId', asyncHandler(deleteRoom))

module.exports = router
