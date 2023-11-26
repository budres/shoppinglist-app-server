const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')
const { ABL_ERRORS } = require('../../errors/abl')
const { DaoError } = require('../../errors/dao')

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
    try {
    const ajv = new Ajv()

    const validBody = ajv.validate(bodySchema, req.body)
    if (!validBody) {
        return res.status(400).json({ code: ABL_ERRORS.invalidBody, message: ajv.errors })
    }

    const { name } = req.body
    const { id } = req.user

    let result = await listDao.createShoppingList(name, id)

    const members = (await userDao.getUsersById(result.members)).map(member => ({ id: member.id, name: member.name, tag: member.tag }))
    const owner = members.find(member => member.id === result.owner)

    res.json({
        ...result,
        members,
        owner
    })
    } catch (err) {
        if (err instanceof DaoError) {
            return res.status(400).json({ code: err.code, message: err.message })
        }

        res.status(500).json({ code: ABL_ERRORS.unknown, message: err.message })
    }
}

module.exports = CreateShoppingListAbl  