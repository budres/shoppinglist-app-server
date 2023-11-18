import {v4 as uuidv4} from 'uuid';

let USERS = [
    {
        id: "1",
        name: "User 1",
        tag: "@user1",
    },
    {
        id: "2",
        name: "User 2",
        tag: "@user2",
    }
]

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

    async createUser(name, tag) {
        const user = {
            id: uuidv4(),
            name,
            tag
        }

        USERS.push(user)

        return user
    }
}

module.exports = UserDao