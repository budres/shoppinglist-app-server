class ListDao {
    constructor(db) {
        this.db = db
    }

    async getAllShoppingLists() {
        return "getAllShoppingLists"
    }

    async createShoppingList() {
        return "createShoppingList"
    }

    async getShoppingList() {
        return "getShoppingList"
    }

    async updateShoppingList() {
        return "updateShoppingList"
    }

    async removeShoppingList() {
        return "removeShoppingList"
    }

    async addShoppingListItem() {
        return "addShoppingListItem"
    }

    async updateShoppingListItem() {
        return "updateShoppingListItem"
    }

    async removeShoppingListItem() {
        return "removeShoppingListItem"
    }

    async addShoppingListUser() {
        return "addShoppingListUser"
    }

    async removeShoppingListUser() {
        return "removeShoppingListUser"
    }
}

module.exports = ListDao