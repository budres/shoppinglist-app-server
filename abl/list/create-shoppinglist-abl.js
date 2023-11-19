const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const listDao = new ListDao()
const userDao = new UserDao()

const bodySchema = {
    type: "object",
    properties: {
        name: { type: "string" }
    },
    required: ["name"]
}

const CreateShoppingListAbl = async (req, res) => {
    const ajv = new Ajv()

    const validBody = ajv.validate(bodySchema, req.body)
    if (!validBody) {
        res.status(400).json(ajv.errors)
        return
    }

    const { name } = req.body

    let result = await listDao.createShoppingList(name, "session")

    const members = await userDao.getUsersById(result.members)
    const owner = members.find(member => member.id === result.owner)

    res.json({
        ...result,
        members,
        owner
    })
}

module.exports = CreateShoppingListAbl  