const jwt = require('jsonwebtoken')

const NewJWT = async (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' })
}

module.exports = NewJWT