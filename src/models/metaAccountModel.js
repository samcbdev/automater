import db from "../config/db.js"

export const storeMeta = async (userId, pageId, pageName, pageToken, igId) => {
    await db.query(
        `INSERT INTO meta_accounts
        (user_id, page_id, page_name, page_access_token, instagram_id)
        VALUES (?, ?, ?, ?, ?)`,
        [
            userId, 
            pageId, 
            pageName, 
            pageToken, 
            igId
        ]
    )
    console.log("store meta")
}