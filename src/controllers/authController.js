import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { findUserByEmail, createUser } from "../models/userModel.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await findUserByEmail(email)

        if (user) {
            return res.status(400).json({message:"User already exists"})
        }

        const hashed = await bcrypt.hash(password, 12)

        const userId = await createUser(name, email, hashed)

        return res.json({message: "User created", userId})
    } catch (err) {
        console.log("user err", err)
        res.status(500).json(err)
    }
}

export const login = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return res.status(401).json({message: "Password mismatch"})
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_TOKEN,
            {expiresIn: "7d"}
        )

        res.json({token})
    } catch (err) {
        res.status(500).json(err)
    }
}