const jwt = require('jsonwebtoken')
const UserDao = require('../../dao/user-dao')

const userDao = new UserDao()

const JWT_SECRET = '78b789459845v49j8v4980c4298'

const NewJWT = async (userId) => {
    // TODO handle expiration
    return jwt.sign({ userId }, JWT_SECRET)
}

const GetUserIdFromJWT = (token) => {
    const { userId } = jwt.verify(token, JWT_SECRET)
    return userId
}

const VerifyJWT = async (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const userId = GetUserIdFromJWT(token)
        const user = await userDao.getUserById(userId)
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = {NewJWT, VerifyJWT}