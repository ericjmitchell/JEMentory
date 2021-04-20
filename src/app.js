const express = require('express')
const cors = require('cors')

const router = require('./routes')

const errorHandler = require('./helpers/errorHandler')
const server = express()

server.use(cors())
server.use(express.urlencoded({ extended: true, strict: false }))
server.use(express.json())
server.use(router)

server.use(errorHandler.notFound)
server.use(errorHandler.internalServerError)

module.exports = server
