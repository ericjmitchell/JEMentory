const { dbStart } = require('./inventory')

const pkPrefix = 'FAMILY'
const getPK = (id) => {
  return `${pkPrefix}:${id}`
}

const skPrefix = 'PROFILE'
const getSK = () => {
  return `${skPrefix}`
}

const selectFields = [
  'id',
  'name',
]

const getFamilyDB = async (db, id) => {
  const family = await dbStart(db)
    .select(selectFields)
    .where('PK').eq(getPK(id))
    .where('SK').eq(getSK())
    .consistent_read()
    .get()

  return family
}

const saveFamilyDB = async (db, saveFamily) => {
  await dbStart(db)
    .return(db.NONE)
    .insert_or_update({
      PK: getPK(saveFamily.id),
      SK: getSK(),
      ...saveFamily
    })
}

const deleteFamilyDB = async (db, id) => {
  await dbStart(db)
		.where('PK').eq( getPK(id) )
		.where('SK').eq( getSK() )
		.return(db.NONE)
		.delete();
}

module.exports = {
  getFamilyDB,
  saveFamilyDB,
  deleteFamilyDB
}
