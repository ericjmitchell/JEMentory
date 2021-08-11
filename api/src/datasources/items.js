const {
  getItemDB,
  getAllItemsDB,
  saveItemDB,
  deleteItemDB
} = require('./db/items')

const getItemDS = async (db, familyId, id) => {
  return getItemDB(db, familyId, id)
}

const getAllItemsDS = async (db, familyId) => {
  return getAllItemsDB(db, familyId)
}

const saveItemDS = async (db, familyId, saveItem) => {
  return saveItemDB(db, familyId, saveItem)
}

const deleteItemDS = async (db, familyId, id) => {
  return deleteItemDB(db, familyId, id)
}

module.exports = {
  getItemDS,
  getAllItemsDS,
  saveItemDS,
  deleteItemDS
}
