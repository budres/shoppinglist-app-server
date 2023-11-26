const ListDao = require("../../dao/list-dao");
const { AblError, ABL_ERRORS } = require("../../errors/abl");
const { DaoError } = require("../../errors/dao");

const listDao = new ListDao();

const GetAllShoppingListsAbl = async (req, res) => {
    try {
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

        res.json(filteredLists);
    } catch (err) {
        if (err instanceof DaoError) {
            return res.status(400).json({ code: err.code, message: err.message })
        }
        res.status(500).json({ code: ABL_ERRORS.unknown, message: err.message })
    }
};

module.exports = GetAllShoppingListsAbl;