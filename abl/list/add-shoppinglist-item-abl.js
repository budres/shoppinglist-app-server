const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const dao = new ListDao()

const schema = {
    type: "object",
    properties: {
        name: { type: "string" }
    },
    required: ["name"]
}

const AddShoppingListItemAbl = async (req, res) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id, name } = req.body

    const result = await dao.addShoppingListItem(id, name)
    res.json(result)
}

module.exports = AddShoppingListItemAbl