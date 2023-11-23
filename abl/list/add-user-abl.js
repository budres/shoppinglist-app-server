const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const listDao = new ListDao()
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
        userTag: { type: "string" }
    },
    required: ["userTag"]
}

const AddShoppingListUserAbl = async (req, res) => {
    const ajv = new Ajv()

    const validParams = ajv.validate(paramsSchema, req.params)
    if (!validParams) {
        res.status(400).json(ajv.errors)
        return
    }
    const { id } = req.params

    const validBody = ajv.validate(bodySchema, req.body)
    if (!validBody) {
        res.status(400).json(ajv.errors)
        return
    }
    const { userTag } = req.body

    const userId = await userDao.getUserByTag(userTag)

    let result = await listDao.addShoppingListUser(id, userId)

    const members = await userDao.getUsersById(result.members)
    const owner = members.find(member => member.id === result.owner)

    res.json({
        ...result,
        members,
        owner
    })
}

module.exports = AddShoppingListUserAbl