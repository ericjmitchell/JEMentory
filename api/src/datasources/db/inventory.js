const tableName = 'inventory'

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

const dbStart = (db) => {
  return db
    .schema(schema)
    .table(tableName)
    .return_consumed_capacity('NONE')
}

module.exports = {
  tableName,
  schema,
  dbStart,
}
