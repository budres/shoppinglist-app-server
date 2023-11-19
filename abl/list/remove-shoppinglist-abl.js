const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const listDao = new ListDao()

const paramsSchema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"]
}

const RemoveShoppingListAbl = async (req, res) => {
    const ajv = new Ajv()

    const validParams = ajv.validate(paramsSchema, req.params)
    if (!validParams) {
        res.status(400).json(ajv.errors)
        return
    }
    const { id } = req.params

    const result = await listDao.removeShoppingList(id)
    res.json(result)
}

module.exports = RemoveShoppingListAbl