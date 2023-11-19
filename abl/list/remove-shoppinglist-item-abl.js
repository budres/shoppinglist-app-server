const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const listDao = new ListDao()
const userDao = new UserDao()

const paramsSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        itemId: { type: "string" }
    },
    required: ["id", "itemId"]
}

const RemoveShoppingListItemAbl = async (req, res) => {
    const ajv = new Ajv()
    
    const validParams = ajv.validate(paramsSchema, req.params)
    if (!validParams) {
        res.status(400).json(ajv.errors)
        return
    }

    const { id, itemId } = req.params

    let result = await listDao.removeShoppingListItem(id, itemId)
    
    const members = await userDao.getUsersById(result.members)
    const owner = members.find(member => member.id === result.owner)

    res.json({
        ...result,
        members,
        owner
    })
}

module.exports = RemoveShoppingListItemAbl