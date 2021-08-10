const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')

const { authenticate, getUser, getAllUsers, saveUser, deleteUser } = require('../controllers/users')

router.post('/authenticate', asyncHandler(authenticate))

router.get('/', asyncHandler(getAllUsers))

router.get('/:userId', asyncHandler(getUser))

router.post('/', asyncHandler(saveUser))

router.delete('/:userId', asyncHandler(deleteUser))

module.exports = router
