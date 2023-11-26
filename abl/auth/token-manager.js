const jwt = require('jsonwebtoken')
const UserDao = require('../../dao/user-dao')
const { ABL_ERRORS } = require('../../errors/abl')

const userDao = new UserDao()

const JWT_SECRET = 'jwtsecret7mv5m435c8795c4m7c542mc5o5cmu'

const NewJWT = async (userId) => {
    // TODO handle expiration
    return jwt.sign({ userId }, JWT_SECRET)
}

const GetUserIdFromJWT = (token) => {
    const { userId } = jwt.verify(token, JWT_SECRET)
    return userId
}

const VerifyJWT = async (req, res, next) => {
    try {

        const token = req.header('Authorization')
        if (!token) {
            return res.status(401).json({ code: ABL_ERRORS.missingToken, message: 'Missing token' })
        }

        const userId = GetUserIdFromJWT(token)
        if (!userId) {
            return res.status(401).json({ code: ABL_ERRORS.invalidToken, message: 'Invalid token' })
        }
        
        const user = await userDao.getUserById(userId)

        req.user = user

        next()
    } catch (err) {
        res.status(401).json({ code: ABL_ERRORS.invalidToken, message: 'Invalid token: ' + err.message })
    }
}

module.exports = { NewJWT, VerifyJWT }