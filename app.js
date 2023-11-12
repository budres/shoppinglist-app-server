const express = require("express")
const app = express()

const listRouter = require(".controller/list-controller")

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({message: "Hello World"})
})

app.use("/shopping-list", listRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})