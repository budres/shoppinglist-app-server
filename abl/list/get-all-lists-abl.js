const ListDao = require('../../dao/list-dao')   

const listDao = new ListDao()

const GetAllShoppingListsAbl = async (req, res) => {
    const result = await listDao.getAllShoppingLists()
    res.json(result)
}

module.exports = GetAllShoppingListsAbl