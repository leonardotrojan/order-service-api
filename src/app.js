import express from "express"
import router from "./routes/order.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(express.json())

app.use(authRoutes)
app.use(router)

app.get('/', (req, res) => {
    res.send('hello world')
})

export default app