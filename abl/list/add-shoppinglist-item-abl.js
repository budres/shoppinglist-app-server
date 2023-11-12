const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const dao = new ListDao()

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        itemName: { type: "string" }
    },
    required: ["id", "itemName"]
}

const AddShoppingListItemAbl = async (req, res) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id, itemName } = req.body

    const result = await dao.addShoppingListItem(id, itemName)
    res.json(result)
}

module.exports = AddShoppingListItemAbl