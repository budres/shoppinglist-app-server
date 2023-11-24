const ListDao = require('../../dao/list-dao')   

const listDao = new ListDao()

const GetAllShoppingListsAbl = async (req, res) => {
    const result = await listDao.getAllShoppingLists()
    
    // map and filter combined
    const filteredLists = result.reduce((accumulator, list) => {
        if (list.members.includes(req.user.id)) {
          accumulator.push({
            id: list.id,
            name: list.name,
            isArchived: list.isArchived,
            totalItems: list.items.length,
          });
        }
        return accumulator;
      }, []);
      

    res.json(filteredLists)
}

module.exports = GetAllShoppingListsAbl