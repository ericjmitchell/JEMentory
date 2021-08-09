const { dbStart } = require('./inventory')

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

const pkPrefix = 'FAMILY'
const getPK = (user) => {
  return `${pkPrefix}:${user.familyId}`
}

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
  const item = await dbStart(db)
    .select(selectFields)
    .where('PK').eq(getPK(user))
    .where('SK').eq(getSK(id))
    .consistent_read()
    .get()

  return item
}

const getAllItemsDB = async (db, user) => {
  const items = await dbStart(db)
    .select(selectFields)
    .where('PK').eq(getPK(user))
    .where('SK').begins_with(skPrefix)
    .limit(100)
    .consistent_read()
    .query()

  return items
}

const saveItemDB = async (db, user, saveItem) => {
  await dbStart(db)
    .return(db.NONE)
    .insert_or_update({
      PK: getPK(user),
      SK: getSK(saveItem.id),
      ...saveItem
    })
}

const deleteItemDB = async (db, user, id) => {
  await dbStart(db)
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
