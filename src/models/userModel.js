import db from "../config/db.js"

export const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * from users where email = ?",
        [email]
    )
    return rows[0]
}

export const createUser = async (name, email, password) => {
    const [result] = await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    )
    return result.insertId
}