// shopping list management

const express = require('express')
const router = express.Router()

const GetAllShoppingListsAbl = require('../abl/list/get-all-lists-abl')

const CreateShoppingListAbl = require('../abl/list/create-list-abl')
const GetShoppingListAbl = require('../abl/list/get-list-abl')
const UpdateShoppingListAbl = require('../abl/list/update-list-abl')    
const RemoveShoppingListAbl = require('../abl/list/remove-list-abl')

const AddShoppingListItemAbl = require('../abl/list/add-item-abl')
const UpdateShoppingListItemAbl = require('../abl/list/update-item-abl')
const RemoveShoppingListItemAbl = require('../abl/list/remove-item-abl')

const AddShoppingListUserAbl = require('../abl/list/add-user-abl')
const RemoveShoppingListUserAbl = require('../abl/list/remove-user-abl')


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

router.post('/:id/items', async (req, res) => {
    await AddShoppingListItemAbl(req, res)
})

router.put('/:id/items/:itemId', async (req, res) => {
    await UpdateShoppingListItemAbl(req, res)
})

router.delete('/:id/items/:itemId', async (req, res) => {  
    await RemoveShoppingListItemAbl(req, res)
})


// shopping-list-user

router.post('/:id/users', async (req, res) => {
    await AddShoppingListUserAbl(req, res)
})

router.delete('/:id/users/:userId', async (req, res) => {
    await RemoveShoppingListUserAbl(req, res)
})

module.exports = router