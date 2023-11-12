const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const dao = new ListDao()

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        userId: { type: "string" }
    },
    required: ["id", "userId"]
}

const RemoveShoppingListUserAbl = async (req, res) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id, userId } = req.body

    const result = await dao.removeShoppingListUser(id, userId)
    res.json(result)
}

module.exports = RemoveShoppingListUserAbl