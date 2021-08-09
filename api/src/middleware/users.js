const addUser = (req, res, next) => {
  res.locals.user = { name: 'bob', familyId: '1' }

  next()
}

module.exports = {
  addUser
}
