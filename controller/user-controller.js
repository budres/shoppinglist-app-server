// user management - login, register, logout

const express = require('express')

const router = express.Router()

const register = require('../abl/auth/register')
const login = require('../abl/auth/login')
const logout = require('../abl/auth/logout')

const {VerifyJWT} = require('../abl/auth/token-manager')

router.post('/register', async (req, res) => {
    await register(req, res)
})

router.post('/login', async (req, res) => {
    await login(req, res)
})

router.post('/logout', VerifyJWT, async (req, res) => {
    await logout(req, res)
})  

module.exports = router