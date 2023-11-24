const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')
const UserDao = require('../../dao/user-dao')

const isMember = require('../../abl/utils/user-validation')
const { DaoError, DAO_ERRORS } = require('../../errors/dao')
const { AblError } = require('../../errors/abl')

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
    const userId = req.user.id
    const { id } = req.params

    if (!await isMember(userId, id)) {
        res.status(403).json({ message: 'Forbidden' })
        res.status(404).json(new AblError(error.name, error.message, 'GetShoppingListAbl<' + error.stack))

        return
    }

    const ajv = new Ajv()

    const validParams = ajv.validate(paramsSchema, req.params)
    if (!validParams) {
        res.status(404).json(new AblError(error.name, error.message, 'GetShoppingListAbl<' + error.stack))
        res.status(400).json(ajv.errors)
        return
    }

    try {
        let result = await listDao.getShoppingList(id)
        const members = await userDao.getUsersById(result.members)
        const owner = members.find(member => member.id === result.owner)

        res.json({
            ...result,
            members,
            owner
        })
    } catch (error) {
        if (error instanceof DaoError) {
            switch (error.name) {
                case DAO_ERRORS.listNotFound:
                    res.status(404).json(new AblError(error.name, error.message, 'GetShoppingListAbl<' + error.stack))
                    break
                default:
                    res.status(500).json(new AblError('Unknown error', error.message, 'GetShoppingListAbl<' + error.stack))
                    break
            }
        } else {
            res.status(500).json(new AblError('Unknown error', 'Internal server error: ' + error, 'GetShoppingListAbl<' + error.stack))
        }
    }
}

module.exports = GetShoppingListAbl