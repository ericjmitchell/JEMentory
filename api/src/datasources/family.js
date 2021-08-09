const {
  getFamilyDB,
  saveFamilyDB,
  deleteFamilyDB
} = require('./db/family')

const getFamilyDS = async (db, id) => {
  return getFamilyDB(db, id)
}

const saveFamilyDS = async (db, saveFamily) => {
  return saveFamilyDB(db, saveFamily)
}

const deleteFamilyDS = async (db, id) => {
  return deleteFamilyDB(db, id)
}

module.exports = {
  getFamilyDS,
  saveFamilyDS,
  deleteFamilyDS
}
