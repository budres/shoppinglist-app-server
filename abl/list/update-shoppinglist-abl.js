const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const dao = new ListDao()

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        isArchived: { type: "boolean" }
    },
    required: ["id"],
    anyOf: [
        { required: ["name"] },
        { required: ["isArchived"] }
    ]
}

const UpdateShoppingListAbl = async (req, res) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id, name, isArchived } = req.body

    const result = await dao.updateShoppingList(id, name, isArchived)
    res.json(result)
}

module.exports = UpdateShoppingListAbl