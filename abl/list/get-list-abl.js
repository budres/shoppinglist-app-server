const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const isMember = require('../../abl/utils/user-validation')
const { DaoError, DAO_ERRORS } = require('../../errors/dao')
const { AblError, ABL_ERRORS } = require('../../errors/abl')

const listDao = new ListDao()
const userDao = new UserDao()

const paramsSchema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"]
}

const GetShoppingListAbl = async (req, res) => {
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

        let result = await listDao.getShoppingList(id)
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
        res.status(500).json({ code: DAO_ERRORS.unknown, message: error.message })
    }
}

module.exports = GetShoppingListAbl