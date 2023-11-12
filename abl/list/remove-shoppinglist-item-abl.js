const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const dao = new ListDao()

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        itemId: { type: "string" }
    },
    required: ["id", "itemId"]
}

const RemoveShoppingListItemAbl = async (req, res) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id, itemId } = req.body

    const result = await dao.removeShoppingListItem(id, itemId)
    res.json(result)
}

module.exports = RemoveShoppingListItemAbl