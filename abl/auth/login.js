const Ajv = require('ajv')
const UserDao = require('../../dao/user-dao')
const NewJWT = require('./token-manager')

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
    const ajv = new Ajv()

    const validBody = ajv.validate(bodySchema, req.body)
    if (!validBody) {
        res.status(400).json(ajv.errors)
        return
    }

    const { tag, password } = req.body

    const user = await userDao.getUserByTag(tag)

    if (!user) {
        res.status(404).json({ message: "User not found" })
        return
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        res.status(401).json({ message: "Invalid password" })
        return
    }

    const token = await NewJWT(user.id)

    res.json({ token })
}

module.exports = Login