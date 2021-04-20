const { getRoomDS, getAllRoomsDS, saveRoomDS, deleteRoomDS } = require('../datasources/rooms')

const getRoom = async (req, res) => {
  const { roomId } = req.params
  const room = await getRoomDS(roomId)

  if (!room) {
    res.status(404)
    throw new Error(`Room ${roomId} not found!`)
  }

  res.json(room)
}

const getAllRooms = async (req, res) => {
  const rooms = await getAllRoomsDS()

  res.json(rooms)
}

const saveRoom = async (req, res) => {
  const { body: room } = req

  const result = await saveRoomDS(room)

  res.json(result)
}

const deleteRoom = async (req, res) => {
  const { roomId } = req.params
  const result = await deleteRoomDS(roomId)

  res.json(result)
}

module.exports = {
  getRoom,
  getAllRooms,
  saveRoom,
  deleteRoom
}
