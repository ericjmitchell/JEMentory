const addUser = (req, res, next) => {
  res.user = 'bob'

  next()
}

module.exports = {
  addUser
}
