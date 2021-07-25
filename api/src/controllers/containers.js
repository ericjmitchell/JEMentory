const { getContainerDS, getAllContainersDS, getAllContainersInRoomDS, saveContainerDS, deleteContainerDS } = require('../datasources/containers')

const getContainer = async (req, res) => {
  const { containerId } = req.params
  const container = await getContainerDS(containerId)

  if (!container) {
    res.status(404)
    throw new Error(`Container ${containerId} not found!`)
  }

  res.json(container)
}

const getAllContainers = async (req, res) => {
  const containers = await getAllContainersDS()

  res.json(containers)
}

const getAllContainersInRoom = async (req, res) => {
  const { roomId } = req.params

  const containers = await getAllContainersInRoomDS(roomId)

  res.json(containers)
}

const saveContainer = async (req, res) => {
  const { body: container } = req

  const result = await saveContainerDS(container)

  res.json(result)
}

const deleteContainer = async (req, res) => {
  const { containerId } = req.params
  const result = await deleteContainerDS(containerId)

  res.json(result)
}

module.exports = {
  getContainer,
  getAllContainers,
  getAllContainersInRoom,
  saveContainer,
  deleteContainer
}
