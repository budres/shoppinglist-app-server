const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')

const isOwner = require('../../abl/utils/user-validation')
const { ABL_ERRORS } = require('../../errors/abl')
const { DaoError } = require('../../errors/dao')

const listDao = new ListDao()

const paramsSchema = {
    type: "object",
    properties: {
        id: { type: "string" }
    },
    required: ["id"]
}

const RemoveShoppingListAbl = async (req, res) => {
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

        const result = await listDao.removeShoppingList(id)
        res.json(result)
    } catch (err) {
        if (err instanceof DaoError) {
            return res.status(400).json({ code: err.code, message: err.message })
        }
        res.status(500).json({ code: ABL_ERRORS.unknown, message: err.message })
    }
}

module.exports = RemoveShoppingListAbl