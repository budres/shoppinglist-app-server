const express = require("express")
const app = express()
const cors = require("cors")

const listRouter = require("./controller/list-controller")
const userRouter = require("./controller/user-controller")

const PORT = 8000
const prefix = "/api"

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get(prefix + "/", (req, res) => {
    res.json({message: "Hello World"})
})

app.use(prefix + '/auth', userRouter)

app.use(prefix + "/shopping-lists", listRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})