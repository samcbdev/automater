import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import metaRoutes from "./routes/metaRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/meta", metaRoutes)
app.use("/", dashboardRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server Running", process.env.PORT)
})