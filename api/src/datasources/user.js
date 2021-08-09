const {
  getUserDB,
  getAllUsersDB,
  saveUserDB,
  deleteUserDB
} = require('./db/users')

const getUserDS = async (db, id) => {
  return getUserDB(db, id)
}

const getAllUsersDS = async (db) => {
  return getAllUsersDB(db)
}

const saveUserDS = async (db, saveUser) => {
  return saveUserDB(db, saveUser)
}

const deleteUserDS = async (db, id) => {
  return deleteUserDB(db, id)
}

module.exports = {
  getUserDS,
  getAllUsersDS,
  saveUserDS,
  deleteUserDS
}
