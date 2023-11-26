const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const isOwner = require('../../abl/utils/user-validation')
const { ABL_ERRORS } = require('../../errors/abl')
const { DaoError } = require('../../errors/dao')

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
        tag: { type: "string" }
    },
    required: ["tag"]
}

const AddShoppingListUserAbl = async (req, res) => {
    try {

        const userId = req.user.id
        const { id } = req.params

        if (!await isOwner(userId, id)) {
            return res.status(403).json({ code: ABL_ERRORS.forbidden, message: 'You are not allowed to call this feature' })
        }

        const ajv = new Ajv()

        const validParams = ajv.validate(paramsSchema, req.params)
        if (!validParams) {
            return res.status(400).json({ code: ABL_ERRORS.invalidParams, message: ajv.errors })
        }

        const validBody = ajv.validate(bodySchema, req.body)
        if (!validBody) {
            return res.status(400).json({ code: ABL_ERRORS.invalidBody, message: ajv.errors })
        }
        const { tag } = req.body

        const addedUser = await userDao.getUserByTag(tag)
        const addedUserId = addedUser.id
        if (!addedUserId) {
            return res.status(404).json({ code: ABL_ERRORS.userNotFound, message: 'User not found' })
        }

        let result = await listDao.addShoppingListUser(id, addedUserId)

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

module.exports = AddShoppingListUserAbl