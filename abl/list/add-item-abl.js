const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const isMember = require('../../abl/utils/user-validation')

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
        name: { type: "string" }
    },
    required: ["name"]
}

const AddShoppingListItemAbl = async (req, res) => {
    const userId = req.user.id
    const { id } = req.params

    if (!await isMember(userId, id)) {
        res.status(403).json({ message: 'Forbidden' })
        return
    }

    const ajv = new Ajv()

    const validParams = ajv.validate(paramsSchema, req.params)
    if (!validParams) {
        res.status(400).json(ajv.errors)
        return
    }

    const validBody = ajv.validate(bodySchema, req.body)
    if (!validBody) {
        res.status(400).json(ajv.errors)
        return
    }
    const { name } = req.body

    let result = await listDao.addShoppingListItem(id, name)

    const members = await userDao.getUsersById(result.members)
    const owner = members.find(member => member.id === result.owner)

    res.json({
        ...result,
        members,
        owner
    })
}

module.exports = AddShoppingListItemAbl