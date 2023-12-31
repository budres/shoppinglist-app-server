const ListDao = require('../../dao/list-dao')
const listDao = new ListDao()
const UserDao = require('../../dao/user-dao')
const userDao = new UserDao()

const { DaoError, DAO_ERRORS } = require("../../errors/dao")
const { AblError, ABL_ERRORS } = require("../../errors/abl")


const isMember = async (userId, listId) => {
    const list = await listDao.getShoppingList(listId)
    if (list.members.includes(userId)) {
        return true
    }
    return false
}

const isOwner = async (userId, listId) => {
    const list = await listDao.getShoppingList(listId)
    if (list.owner === userId) {
        return true
    }
    return false
}

const isTagTaken = async (tag) => {
    try {
        await userDao.getUserByTag(tag)
        return [true, new AblError(ABL_ERRORS.tagTaken, `Tag ${tag} is already taken`)]
    } catch (err) {
        if (err.code === DAO_ERRORS.userNotFound) {
            return [false, null]
        }
        return [true, new AblError(ABL_ERRORS.unknown, error.message)]
    }
}


module.exports = isTagTaken, isOwner, isMember