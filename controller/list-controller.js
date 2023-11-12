const express = require('express')
const router = express.Router()

const GetAllShoppingListsAbl = require('../abl/list/get-all-shoppinglists-abl')

const CreateShoppingListAbl = require('../abl/list/create-shoppinglist-abl')
const GetShoppingListAbl = require('../abl/list/get-shoppinglist-abl')
const UpdateShoppingListAbl = require('../abl/list/update-shoppinglist-abl')    
const RemoveShoppingListAbl = require('../abl/list/remove-shoppinglist-abl')

const AddShoppingListItemAbl = require('../abl/list/add-shoppinglist-item-abl')
const UpdateShoppingListItemAbl = require('../abl/list/update-shoppinglist-item-abl')
const RemoveShoppingListItemAbl = require('../abl/list/remove-shoppinglist-item-abl')

const AddShoppingListUserAbl = require('../abl/list/add-shoppinglist-user-abl')
const RemoveShoppingListUserAbl = require('../abl/list/remove-shoppinglist-user-abl')


// shopping-list

router.get('', async (req, res) => {
    await GetAllShoppingListsAbl(req, res)
})

router.post('', async (req, res) => {
    await CreateShoppingListAbl(req, res)
})

router.get('/:id', async (req, res) => {
    await GetShoppingListAbl(req, res)
})

router.put('/:id', async (req, res) => {
    await UpdateShoppingListAbl(req, res)
})

router.delete('/:id', async (req, res) => {    
    await RemoveShoppingListAbl(req, res)
})


// shopping-list-item

router.post('/:id/item', async (req, res) => {
    await AddShoppingListItemAbl(req, res)
})

router.put('/:id/item/:itemId', async (req, res) => {
    await UpdateShoppingListItemAbl(req, res)
})

router.delete('/:id/item/:itemId', async (req, res) => {  
    await RemoveShoppingListItemAbl(req, res)
})


// shopping-list-user

router.post('/:id/user', async (req, res) => {
    await AddShoppingListUserAbl(req, res)
})

router.delete('/:id/user/:userId', async (req, res) => {
    await RemoveShoppingListUserAbl(req, res)
})

module.exports = router