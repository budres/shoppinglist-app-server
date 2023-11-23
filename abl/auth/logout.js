const Logout = async (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'logged out' })
}

module.exports = Logout