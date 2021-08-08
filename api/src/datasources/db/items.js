const { tableName, schema, getPK } = require('./inventory')

// id: String,
// name: String,
// category: String,
// amount: Number,
// unit: String,
// daysPerUnit: Number,
// lastPrice: Number,
// purchaseAmount: Number,
// purchaseDate: Date,
// store: String,
// tax: Bool

const skPrefix = 'ITEM'
const getSK = (id) => {
  return `${skPrefix}:${id}`
}

const selectFields = [
  'id',
  'name',
  'category',
  'amount',
  'unit',
  'daysPerUnit',
  'lastPrice',
  'purchaseAmount',
  'purchaseDate',
  'store',
  'tax'
]

const getItemDB = async (db, user, id) => {
  const item = await db
    .table(tableName)
    .return_consumed_capacity('NONE')
    .schema(schema)
    .where('PK').eq(getPK(user))
    .where('SK').eq(getSK(id))
    .consistent_read()
    .get()

  return item
}

const getAllItemsDB = async (db, user) => {
  const items = await db
    .table(tableName)
    .return_consumed_capacity('NONE')
    .schema(schema)
    .select(selectFields)
    .where('PK').eq(getPK(user))
    .where('SK').begins_with(skPrefix)
    .limit(100)
    .consistent_read()
    .query()

  return items
}

const saveItemDB = async (db, user, saveItem) => {
  await db
    .table(tableName)
    .return_consumed_capacity('NONE')
    .schema(schema)
    .return(DynamoDB.NONE)
    .insert_or_update({
      PK: getPK(user),
      SK: getSK(saveItem.id),
      ...saveItem
    })
}

const deleteItemDB = (db, user, id) => {
  await db
		.table(tableName)
		.where('PK').eq( getPK(user) )
		.where('SK').eq( getSK(id) )
		.return(DynamoDB.NONE)
		.delete();
}

module.exports = {
  getItemDB,
  getAllItemsDB,
  saveItemDB,
  deleteItemDB
}
