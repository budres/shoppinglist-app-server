const Ajv = require('ajv')
const UserDao = require('../../dao/user-dao')
const bcrypt = require('bcrypt')

const isTagTaken = require('../../abl/utils/user-validation')
const { AblError, ABL_ERRORS } = require('../../errors/abl')
const { DAO_ERRORS, DaoError } = require('../../errors/dao')

const userDao = new UserDao()

const bodySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        tag: { type: "string" },
        password: { type: "string" }
    },
    required: ["name", "tag", "password"]
}

const register = async (req, res) => {
    try {
        const ajv = new Ajv()

        const validBody = ajv.validate(bodySchema, req.body)
        if (!validBody) {
            return res.status(400).json({ code: ABL_ERRORS.invalidBody, message: ajv.errors })
        }

        const { name, tag, password } = req.body

        const [taken, err] = await isTagTaken(tag)
        if (taken) {
            return res.status(409).json({ code: ABL_ERRORS.tagTaken, message: `Tag ${tag} is already taken` })
        } else if (err) {
            return res.status(500).json({ code: ABL_ERRORS.unknown, message: err.message })
        }

        const hash = await bcrypt.hash(password, 10)

        const result = await userDao.createUser(name, tag, hash)

        // not returning the password hash
        res.json({
            id: result.id,
            name: result.name,
            tag: result.tag
        })
    } catch (err) {
        if (err instanceof DaoError) {
            return res.status(400).json({ code: err.code, message: err.message })
        }
        res.status(500).json({ code: ABL_ERRORS.unknown, message: err.message })
    }
}

module.exports = register