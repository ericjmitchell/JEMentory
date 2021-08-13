const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  getUserDB,
  getAllUsersDB,
  saveUserDB,
  deleteUserDB
} = require('./db/users')

const authenticateDS = async (db, email, password) => {
  const user = await getUserDB(db, email)
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.email, family: user.familyId }, process.env.secret, { expiresIn: '7d' })
    delete user.hash
    return {
      user,
      token
    }
  }
}

const getUserDS = async (db, email) => {
  return getUserDB(db, email)
}

const getAllUsersDS = async (db) => {
  return getAllUsersDB(db)
}

const saveUserDS = async (db, saveUser) => {// hash password
  if (saveUser.password) {
    saveUser.hash = bcrypt.hashSync(saveUser.password, 10)
    delete saveUser.password
  }
  return saveUserDB(db, saveUser)
}

const deleteUserDS = async (db, email) => {
  return deleteUserDB(db, email)
}

module.exports = {
  authenticateDS,
  getUserDS,
  getAllUsersDS,
  saveUserDS,
  deleteUserDS
}
