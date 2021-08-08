const {
  getItemDB,
  getAllItemsDB,
  saveItemDB,
  deleteItemDB
} = require('./db/items')

const getItemDS = async (db, user, id) => {
  return getItemDB(db, user, id)
}

const getAllItemsDS = async (db, user) => {
  return getAllItemsDB(db, user)
}

const saveItemDS = async (db, user, saveItem) => {
  return saveItemDB(db, user, saveItem)
}

const deleteItemDS = async (db, user, id) => {
  return deleteItemDB(db, user, id)
}

module.exports = {
  getItemDS,
  getAllItemsDS,
  saveItemDS,
  deleteItemDS
}
