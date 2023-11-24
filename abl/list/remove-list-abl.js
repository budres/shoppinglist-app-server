const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const isOwner = require('../../abl/utils/user-validation')

const listDao = new ListDao()

const paramsSchema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"]
}

const RemoveShoppingListAbl = async (req, res) => {
    const userId = req.user.id
    const { id } = req.params

    if (!await isOwner(userId, id)) {
        res.status(403).json({ message: 'Forbidden' })
        return
    }

    const ajv = new Ajv()

    const validParams = ajv.validate(paramsSchema, req.params)
    if (!validParams) {
        res.status(400).json(ajv.errors)
        return
    }

    const result = await listDao.removeShoppingList(id)
    res.json(result)
}

module.exports = RemoveShoppingListAbl