const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const dao = new ListDao()

const schema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"]
}

const RemoveShoppingListAbl = async (req, res) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id } = req.body

    const result = await dao.removeShoppingList(id)
    res.json(result)
}

module.exports = RemoveShoppingListAbl