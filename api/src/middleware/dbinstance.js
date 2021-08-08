const AWS = require('aws-sdk')
const DynamodbFactory = require('@awspilot/dynamodb')

const addDBInstance = (req, res, next) => {
  if (res.local) {
    res.locals.db = new DynamodbFactory(
      new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }))
  } else {
    res.locals.db = new DynamodbFactory(
      new AWS.DynamoDB({
        region: process.env.AWS_REGION
      }))
  }

  next()
}

module.exports = {
  addDBInstance
}
