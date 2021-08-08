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
  .schema(schema)
    .table(tableName)
    .return_consumed_capacity('NONE')
    .select(selectFields)
    .where('PK').eq(getPK(user))
    .where('SK').eq(getSK(id))
    .consistent_read()
    .get()

  return item
}

const getAllItemsDB = async (db, user) => {
  const items = await db
  .schema(schema)
    .table(tableName)
    .return_consumed_capacity('NONE')
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
  .schema(schema)
    .table(tableName)
    .return_consumed_capacity('NONE')
    .return(db.NONE)
    .insert_or_update({
      PK: getPK(user),
      SK: getSK(saveItem.id),
      ...saveItem
    })
}

const deleteItemDB = async (db, user, id) => {
  await db
  .schema(schema)
		.table(tableName)
		.where('PK').eq( getPK(user) )
		.where('SK').eq( getSK(id) )
		.return(db.NONE)
		.delete();
}

module.exports = {
  getItemDB,
  getAllItemsDB,
  saveItemDB,
  deleteItemDB
}
