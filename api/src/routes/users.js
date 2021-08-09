const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')

const { getUser, getAllUsers, saveUser, deleteUser } = require('../controllers/users')

router.get('/', asyncHandler(getAllUsers))

router.get('/:userId', asyncHandler(getUser))

router.post('/', asyncHandler(saveUser))

router.delete('/:userId', asyncHandler(deleteUser))

module.exports = router
