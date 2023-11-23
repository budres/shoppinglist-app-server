const {v4: uuid} = require('uuid')
const USERS = require('./USERS')


class UserDao {
    constructor(db) {
        this.db = db
    }

    async getUserById(id) {
        return USERS.find(user => user.id === id)
    }

    async getUsersById(ids) {
        return USERS.filter(user => ids.includes(user.id))
    }

    async getUserByTag(tag) {
        return USERS.find(user => user.tag === tag)
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