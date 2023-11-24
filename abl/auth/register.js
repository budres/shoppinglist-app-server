const Ajv = require('ajv')
const UserDao = require('../../dao/user-dao')
const bcrypt = require('bcrypt')

const isTagTaken = require('../../abl/utils/user-validation')
const { AblError, ABL_ERRORS } = require('../../errors/abl')
const { DAO_ERRORS } = require('../../errors/dao')

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
    const ajv = new Ajv()

    const validBody = ajv.validate(bodySchema, req.body)
    if (!validBody) {
        res.status(400).json(ajv.errors)
        return
    }

    const { name, tag, password } = req.body

    let [taken, err] = await isTagTaken(tag)
    if (err) {
        console.log(err)
        res.status(500).json({ name: err.name, message: err.message, stack: err.stack })
        return
    }
    if (taken) {
        res.status(409).json({ name: ABL_ERRORS.tagTaken, message: `Tag ${tag} is already taken`, stack: 'register' })
        return
    }

    const hash = await bcrypt.hash(password, 10)

    const result = await userDao.createUser(name, tag, hash)

    // not returning the password hash
    res.json({
        id: result.id,
        name: result.name,
        tag: result.tag
    })
}

module.exports = register