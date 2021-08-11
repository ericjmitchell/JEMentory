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
const getPK = (familyId) => {
  return `${pkPrefix}:${familyId}`
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

const getItemDB = async (db, familyId, id) => {
  const item = await dbStart(db)
    .select(selectFields)
    .where('PK').eq(getPK(familyId))
    .where('SK').eq(getSK(id))
    .consistent_read()
    .get()

  return item
}

const getAllItemsDB = async (db, familyId) => {
  const items = await dbStart(db)
    .select(selectFields)
    .where('PK').eq(getPK(familyId))
    .where('SK').begins_with(skPrefix)
    .limit(100)
    .consistent_read()
    .query()

  return items
}

const saveItemDB = async (db, familyId, saveItem) => {
  await dbStart(db)
    .return(db.NONE)
    .insert_or_update({
      PK: getPK(familyId),
      SK: getSK(saveItem.id),
      ...saveItem
    })
}

const deleteItemDB = async (db, familyId, id) => {
  await dbStart(db)
		.where('PK').eq( getPK(familyId) )
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
