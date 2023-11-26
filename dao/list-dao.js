const {v4: uuid} = require('uuid')
const SHOPPING_LISTS = require('./SHOPPING_LISTS')
const { DaoError, DAO_ERRORS } = require('../errors/dao')

class ListDao {
    constructor(db) {
        this.db = db
    }

    // return id, name and total items
    async getAllShoppingLists() {
        return SHOPPING_LISTS
    }

    // append to SHOPPING_LISTS and return shopping list
    async createShoppingList(name, userId) {
        const list = {
            id: uuid(),
            name,
            isArchived: false,
            createdAt: new Date(),
            owner: userId,
            members: [userId],
            items: []
        }

        SHOPPING_LISTS.push(list)

        return list
    }

    // find list by id and return it
    async getShoppingList(id) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        return SHOPPING_LISTS[idx]
    }

    // find list by id, update it and return it
    async updateShoppingList(id, name, isArchived) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        let list = SHOPPING_LISTS[idx]

        if (name) list.name = name
        if (isArchived) list.isArchived = isArchived

        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id and remove it
    async removeShoppingList(id) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        SHOPPING_LISTS.splice(idx, 1)

        return {}
    }

    // find list by id, append item and return it
    async addShoppingListItem(id, name) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        let list = SHOPPING_LISTS[idx]

        list.items.push({
            id: uuid(),
            name,
            isCompleted: false
        })

        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id, find item by itemId, update it and return list
    async updateShoppingListItem(id, itemId, name, isCompleted) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        let list = SHOPPING_LISTS[idx]

        const itemIdx = list.items.findIndex(item => item.id === itemId)
        if (itemIdx === -1) throw new DaoError(DAO_ERRORS.itemNotFound, `Item with id ${itemId} in list ${id} not found`)

        let item = list.items[itemIdx]

        if (name) item.name = name
        if (isCompleted) item.isCompleted = isCompleted

        list.items[itemIdx] = item
        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id, find item by itemId and remove it
    async removeShoppingListItem(id, itemId) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        let list = SHOPPING_LISTS[idx]

        const itemIdx = list.items.findIndex(item => item.id === itemId)
        if (itemIdx === -1) throw new DaoError(DAO_ERRORS.itemNotFound, `Item with id ${itemId} in list ${id} not found`)

        list.items.splice(itemIdx, 1)
        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id, append user and return it
    async addShoppingListUser(id, userId) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        let list = SHOPPING_LISTS[idx]

        if (list.members.includes(userId)) throw new DaoError(DAO_ERRORS.userAlreadyMember, `User with id ${userId} is already a member of list ${id}`)

        list.members.push(userId)

        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id, find user by userId and remove it
    async removeShoppingListUser(id, userId) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        if (idx === -1) throw new DaoError(DAO_ERRORS.listNotFound, `List with id ${id} not found`)

        let list = SHOPPING_LISTS[idx]

        const userIdx = list.members.findIndex(user => user === userId)
        if (userIdx === -1) throw new DaoError(DAO_ERRORS.userNotMember, `User with id ${userId} in list ${id} not found`)

        list.members.splice(userIdx, 1)
        SHOPPING_LISTS[idx] = list

        return list
    }
}

module.exports = ListDao