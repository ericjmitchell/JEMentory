const app = require('./src/app')

const port = 3000

dynamoose.aws.ddb.local()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
