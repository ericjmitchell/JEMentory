const express = require('express')
const router = express.Router()

const asyncHandler = require('express-async-handler')

const { login, getUser, getAllUsers, saveUser, deleteUser } = require('../controllers/users')

router.post('/login', asyncHandler(login))

//router.get('/', asyncHandler(getAllUsers))

router.get('/', asyncHandler(getUser))

router.post('/save', asyncHandler(saveUser))

router.delete('/', asyncHandler(deleteUser))

module.exports = router
