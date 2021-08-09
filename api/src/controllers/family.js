const { getFamilyDS, saveFamilyDS, deleteFamilyDS } = require('../datasources/family')

const getFamily = async (req, res) => {
  const { familyId } = req.params
  const family = await getFamilyDS(res.locals.db, familyId)

  if (!family) {
    res.status(404)
    throw new Error(`Family ${familyId} not found!`)
  }

  res.json(family)
}

const saveFamily = async (req, res) => {
  const { body: family } = req

  const result = await saveFamilyDS(res.locals.db, family)

  res.json(result)
}

const deleteFamily = async (req, res) => {
  const { familyId } = req.params
  const result = await deleteFamilyDS(res.locals.db, familyId)

  res.json(result)
}

module.exports = {
  getFamily,
  saveFamily,
  deleteFamily
}
