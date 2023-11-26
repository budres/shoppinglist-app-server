const Ajv = require('ajv')
const UserDao = require('../../dao/user-dao')
const { NewJWT } = require('./token-manager')
const bcrypt = require('bcrypt')
const { ABL_ERRORS } = require('../../errors/abl')
const { DaoError } = require('../../errors/dao')

const userDao = new UserDao()

const bodySchema = {
    type: "object",
    properties: {
        tag: { type: "string" },
        password: { type: "string" }
    },
    required: ["tag", "password"]
}

const Login = async (req, res) => {
    try {
        const ajv = new Ajv()

        const validBody = ajv.validate(bodySchema, req.body)
        if (!validBody) {
            return res.status(400).json({ code: ABL_ERRORS.invalidBody, message: ajv.errors })
        }

        const { tag, password } = req.body

        const user = await userDao.getUserByTag(tag)

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ code: ABL_ERRORS.invalidPassword, message: 'Invalid password' })
        }

        const token = await NewJWT(user.id)

        res.json({ token })
    } catch (err) {
        if (err instanceof DaoError) {
            return res.status(400).json({ code: err.code, message: err.message })
        }
        res.status(500).json({ code: ABL_ERRORS.unknown, message: err.message })
    }
}

module.exports = Login