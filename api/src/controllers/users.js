const { getUserDS, getAllUsersDS, saveUserDS, deleteUserDS } = require('../datasources/users')

const getUser = async (req, res) => {
  const { userId } = req.params
  const user = await getUserDS(res.locals.db, userId)

  if (!user) {
    res.status(404)
    throw new Error(`User ${userId} not found!`)
  }

  res.json(user)
}

const getAllUsers = async (req, res) => {
  const users = await getAllUsersDS(res.locals.db)

  res.json(users)
}

const saveUser = async (req, res) => {
  const { body: user } = req

  const result = await saveUserDS(res.locals.db, user)

  res.json(result)
}

const deleteUser = async (req, res) => {
  const { userId } = req.params
  const result = await deleteUserDS(res.locals.db, userId)

  res.json(result)
}

module.exports = {
  getUser,
  getAllUsers,
  saveUser,
  deleteUser
}
