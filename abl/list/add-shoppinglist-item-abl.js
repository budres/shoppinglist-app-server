const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const dao = new ListDao()
const userDao = new UserDao()

const paramsSchema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"]
}

const bodySchema = {
    type: "object",
    properties: {
        name: { type: "string" }
    },
    required: ["name"]
}

const AddShoppingListItemAbl = async (req, res) => {

    const ajv = new Ajv()

    const validParams = ajv.validate(paramsSchema, req.params)
    const validBody = ajv.validate(bodySchema, req.body)

    if (!validParams || !validBody) {
        res.status(400).json(ajv.errors)
        return
    }

    const { name } = req.body

    let result = await dao.addShoppingListItem(id, name)

    const members = await userDao.getUsersId(result.members)
    const owner = members.find(member => member.id === result.owner)

    result.members = members
    result.owner = owner

    res.json(result)
}

module.exports = AddShoppingListItemAbl