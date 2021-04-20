const { getItemDS, getAllItemsDS, getAllItemsInContainerDS, saveItemDS, deleteItemDS } = require('../datasources/items')

const getItem = async (req, res) => {
  const { itemId } = req.params
  const item = await getItemDS(itemId)

  if (!item) {
    res.status(404)
    throw new Error(`Item ${itemId} not found!`)
  }

  res.json(item)
}

const getAllItems = async (req, res) => {
  const items = await getAllItemsDS()

  res.json(items)
}

const getAllItemsInContainer = async (req, res) => {
  const { containerId } = req.params

  const items = await getAllItemsInContainerDS(containerId)

  res.json(items)
}

const saveItem = async (req, res) => {
  const { body: item } = req

  const result = await saveItemDS(item)

  res.json(result)
}

const deleteItem = async (req, res) => {
  const { itemId } = req.params
  const result = await deleteItemDS(itemId)

  res.json(result)
}

module.exports = {
  getItem,
  getAllItems,
  getAllItemsInContainer,
  saveItem,
  deleteItem
}
