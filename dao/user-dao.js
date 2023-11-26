const {v4: uuid} = require('uuid')
const USERS = require('./USERS')
const { DaoError, DAO_ERRORS } = require('../errors/dao')


class UserDao {
    constructor(db) {
        this.db = db
    }

    async getUserById(id) {
        const idx = USERS.findIndex(user => user.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.userNotFound, `User not found`)

        return USERS[idx]
    }

    async getUsersById(ids) {
        return USERS.filter(user => ids.includes(user.id))
    }

    async getUserByTag(tag) {
        const idx = USERS.findIndex(user => user.tag === tag)
        if (idx === -1) throw new DaoError(DAO_ERRORS.userNotFound, `User with tag ${tag} not found`)

        return USERS[idx]
    }

    async createUser(name, tag, password) {
        const user = {
            id: uuid(),
            name,
            tag,
            password
        }

        USERS.push(user)

        return user
    }
}

module.exports = UserDao