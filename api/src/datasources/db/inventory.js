const tableName = 'inventory'
const pkPrefix = 'FAMILY'

const schema = [
  {
    TableName: tableName,
    KeySchema: [
      {
        AttributeName: "PK",
        KeyType: "HASH"
      },
      {
        AttributeName: "SK",
        KeyType: "RANGE"
      }
    ]
  },
]

const getPK = (user) => {
  return `${pkPrefix}:${user.familyId}`
}

module.exports = {
  tableName,
  schema,
  getPK,
}
