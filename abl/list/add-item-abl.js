const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const isMember = require('../../abl/utils/user-validation')
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
        name: { type: "string" }
    },
    required: ["name"]
}

const AddShoppingListItemAbl = async (req, res) => {

    try {

        const userId = req.user.id
        const { id } = req.params

        if (!await isMember(userId, id)) {
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
        const { name } = req.body

        let result = await listDao.addShoppingListItem(id, name)

        const members = await userDao.getUsersById(result.members)
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

module.exports = AddShoppingListItemAbl