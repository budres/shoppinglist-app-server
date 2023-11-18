import { v4 as uuid } from 'uuid';

let SHOPPING_LISTS = [
    {
        id: "1",
        name: "List 1",
        isArchived: false,
        createdAt: new Date(),
        ownedBy: "1",
        users: [
            "1",
            "2"
        ],
        items: [
            {
                id: "1",
                name: "Item 1",
                isCompleted: false
            },
            {
                id: "2",
                name: "Item 2",
                isCompleted: false
            }
        ]
    },
    {
        id: "2",
        name: "List 2",
        isArchived: false,
        createdAt: new Date()-10000,
        ownedBy: "2",
        users: [
            "1",
            "2"
        ],
        items: [
            {
                id: "1",
                name: "Item 1",
                isCompleted: false
            },
            {
                id: "2",
                name: "Item 2",
                isCompleted: false
            }
        ]
    }
]

class ListDao {
    constructor(db) {
        this.db = db
    }

    // return id, name and total items
    async getAllShoppingLists() {
        return SHOPPING_LISTS.map(list => {
            return {
                id: list.id,
                name: list.name,
                totalItems: list.items.length
            }
        })
    }

    // append to SHOPPING_LISTS and return shopping list
    async createShoppingList(name, userId) {
        const list = {
            id: uuid(),
            name,
            isArchived: false,
            createdAt: new Date(),
            ownedBy: userId,
            users: [userId],
            items: []
        }

        SHOPPING_LISTS.push(list)

        return list
    }

    // find list by id and return it
    async getShoppingList(id) {
        return SHOPPING_LISTS.find(list => list.id === id)
    }

    // find list by id, update it and return it
    async updateShoppingList(id, name, isArchived) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        let list = SHOPPING_LISTS[idx]

        if (name) list.name = name
        if (isArchived) list.isArchived = isArchived

        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id and remove it
    async removeShoppingList(id) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        let list = SHOPPING_LISTS[idx]

        SHOPPING_LISTS.splice(idx, 1)

        return {}
    }

    // find list by id, append item and return it
    async addShoppingListItem(id, name) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
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
        let list = SHOPPING_LISTS[idx]

        const itemIdx = list.items.findIndex(item => item.id === itemId)
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
        let list = SHOPPING_LISTS[idx]

        const itemIdx = list.items.findIndex(item => item.id === itemId)
        let item = list.items[itemIdx]

        list.items.splice(itemIdx, 1)
        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id, append user and return it
    async addShoppingListUser(id, userId) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        let list = SHOPPING_LISTS[idx]

        list.users.push(userId)

        SHOPPING_LISTS[idx] = list

        return list
    }

    // find list by id, find user by userId and remove it
    async removeShoppingListUser(id, userId) {
        const idx = SHOPPING_LISTS.findIndex(list => list.id === id)
        let list = SHOPPING_LISTS[idx]

        const userIdx = list.users.findIndex(user => user.id === userId)
        let user = list.users[userIdx]

        list.users.splice(userIdx, 1)
        SHOPPING_LISTS[idx] = list

        return list
    }
}

module.exports = ListDao