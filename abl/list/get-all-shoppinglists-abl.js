const Ajv = require('ajv')
const ListDao = require('../../dao/list-dao')   

const dao = new ListDao()

const GetAllShoppingListsAbl = async (req, res) => {
    const result = await dao.getAllShoppingLists()
    res.json(result)
}

module.exports = GetAllShoppingListsAbl