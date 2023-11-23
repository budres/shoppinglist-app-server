// user management - login, register, logout

const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const router = express.Router()

const createUserAbl = require('../abl/user/create-abl')

const login = require('../abl/auth/login')
const logout = require('../abl/auth/logout')


router.post('/register', async (req, res) => {
    await createUserAbl(req, res)
})

router.post('/login', async (req, res) => {
    await login(req, res)
})

router.post('/logout', async (req, res) => {
    await logout(req, res)
})  

module.exports = router