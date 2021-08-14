const { loginDS, getUserDS, getAllUsersDS, saveUserDS, deleteUserDS } = require('../datasources/users')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await loginDS(res.locals.db, email, password)

  if (!user) {
    res.status(400)
    throw new Error('Username or password is incorrect')
  }

  res.json(user)
}

const getUser = async (req, res) => {
  const user = await getUserDS(res.locals.db, req.user.sub)

  if (!user) {
    res.status(404)
    throw new Error(`User ${req.user.sub} not found!`)
  }

  delete user.hash

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
  const result = await deleteUserDS(res.locals.db, req.user.sub)

  res.json(result)
}

module.exports = {
  login,
  getUser,
  getAllUsers,
  saveUser,
  deleteUser
}
