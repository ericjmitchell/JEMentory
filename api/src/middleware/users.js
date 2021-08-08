const addUser = (req, res, next) => {
  res.locals.user = { name: 'bob', family: '1' }

  next()
}

module.exports = {
  addUser
}
