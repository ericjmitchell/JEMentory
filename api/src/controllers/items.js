const { getItemDS, getAllItemsDS, saveItemDS, deleteItemDS } = require('../datasources/items')

const getItem = async (req, res) => {
  const { itemId } = req.params
  const item = await getItemDS(res.locals.db, res.locals.user, itemId)

  if (!item) {
    res.status(404)
    throw new Error(`Item ${itemId} not found!`)
  }

  res.json(item)
}

const getAllItems = async (req, res) => {
  const items = await getAllItemsDS(res.locals.db, res.locals.user)

  res.json(items)
}

const saveItem = async (req, res) => {
  const { body: item } = req

  const result = await saveItemDS(res.locals.db, res.locals.user, item)

  res.json(result)
}

const deleteItem = async (req, res) => {
  const { itemId } = req.params
  const result = await deleteItemDS(res.locals.db, res.locals.user, itemId)

  res.json(result)
}

module.exports = {
  getItem,
  getAllItems,
  saveItem,
  deleteItem
}
