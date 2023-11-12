const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const dao = new ListDao()

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        isCompleted: { type: "boolean" }
    },
    required: ["id"],
    anyOf: [
        { required: ["name"] },
        { required: ["isCompleted"] }
    ]
}

const UpdateShoppingListItemAbl = async (req, res) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id, name, isCompleted } = req.body

    const result = await dao.updateShoppingListItem(id, name, isCompleted)
    res.json(result)
}

module.exports = UpdateShoppingListItemAbl