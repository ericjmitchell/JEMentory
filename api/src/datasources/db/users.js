const { dbStart } = require('./inventory')

const pkPrefix = 'PROFILE'
const getPK = () => {
  return `${pkPrefix}`
}

const skPrefix = 'USER'
const getSK = (email) => {
  return `${skPrefix}:${email}`
}

const selectFields = [
  'id',
  'email',
  'hash',
  'firstName',
  'lastName',
  'familyId',
  'role',
]

const getUserDB = async (db, email) => {
  const user = await dbStart(db)
    .select(selectFields)
    .where('PK').eq(getPK())
    .where('SK').eq(getSK(email))
    .consistent_read()
    .get()

  return user
}

const getAllUsersDB = async (db) => {
  const users = await dbStart(db)
    .select(selectFields)
    .where('PK').eq(getPK())
    .where('SK').begins_with(skPrefix)
    .limit(100)
    .consistent_read()
    .query()

  return users
}

const saveUserDB = async (db, saveUser) => {
  await dbStart(db)
    .return(db.NONE)
    .insert_or_update({
      PK: getPK(),
      SK: getSK(saveUser.email),
      ...saveUser
    })
}

const deleteUserDB = async (db, email) => {
  await dbStart(db)
		.where('PK').eq( getPK() )
		.where('SK').eq( getSK(email) )
		.return(db.NONE)
		.delete();
}

module.exports = {
  getUserDB,
  getAllUsersDB,
  saveUserDB,
  deleteUserDB
}
