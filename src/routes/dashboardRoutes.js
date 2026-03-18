import express from "express"
import { authenticate } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/dashboard", authenticate, (req, res) => {
    res.json({
        message:"Authorized access",
        user:req.user
    })
})

export default router