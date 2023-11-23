const Ajv = require('ajv')
const UserDao = require('../../dao/user-dao')

const userDao = new UserDao()

const bodySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        tag: { type: "string" },
        password: { type: "string" }
    },
    required: ["userTag", "userName", "password"]
}

const CreateUserAbl = async (req, res) => {
    const ajv = new Ajv()

    const validBody = ajv.validate(bodySchema, req.body)
    if (!validBody) {
        res.status(400).json(ajv.errors)
        return
    }

    const { name, tag, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    const result = await userDao.createUser(name, tag, hash)

    res.json(result)
}

module.exports = CreateUserAbl