const AWS = require('aws-sdk')
const DynamodbFactory = require('@awspilot/dynamodb')

const addDBInstance = (req, res, next) => {
  if (process.env.LOCAL) {
    console.log('LOCAL')
    res.locals.db = new DynamodbFactory(
      new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }))

  //     res.locals.db.query(`
	// 	CREATE PROVISIONED TABLE inventory (
	// 		PK STRING,
	// 		SK STRING,
	// 		PRIMARY KEY ( PK, SK ) THROUGHPUT 999 99 
	// 	)
	// `, function(err,data) {
	// 	console.log( err, "\n", data )
	// });
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
