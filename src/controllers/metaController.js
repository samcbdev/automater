import axios from "axios"
import { storeMeta } from "../models/metaAccountModel.js"

export const connectMeta = (req, res) => {
    console.log("metaConnect")
    // const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.META_APP_ID}&redirect_uri=${process.env.META_REDIRECT_URI}&scope=instagram_basic,pages_show_list,pages_read_engagement,pages_manage_metadata,pages_manage_engagement,instagram_manage_comments,instagram_manage_messages,pages_messaging`
    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.META_APP_ID}&redirect_uri=${process.env.META_REDIRECT_URI}&scope=pages_show_list,pages_read_engagement,pages_manage_metadata,pages_messaging&response_type=code`
    console.log(url)
    res.redirect(url)
    // res.json({message: "Meta link generated"})
}

export const metaCallback = async (req, res) => {
    console.log("metaCallback")
    try {
        const code = req.query.code

        // user access token
        const tokenRes = await axios.get(
            `https://graph.facebook.com/v19.0/oauth/access_token`,
            {
                params: {
                    client_id: process.env.META_APP_ID,
                    client_secret: process.env.META_APP_SECRET,
                    redirect_uri: process.env.META_REDIRECT_URI,
                    code
                }
            }
        )

        const userToken = tokenRes.data.access_token

        // page res
        const pageRes = await axios.get(
            `https://graph.facebook.com/v19.0/me/accounts`,
            {
                params: {
                    access_token: userToken
                }
            }
        )

        const pages = pageRes.data.data
        console.log("pages", pages)

        const page = pages[0]
        
        const pageId = page.id
        const pageToken = page.access_token
        const pageName = page.name

        // get ig id
        const igRes = await axios.get(
            `https://graph.facebook.com/v19.0/${pageId}`,
            {
                params: {
                    fields: "instagram_business_account",
                    access_token: pageToken
                }
            }
        )

        const igId = igRes.data.instagram_business_account?.id

        // save db
        await storeMeta(1, pageId, pageName, pageToken, igId) // req.user.id
        
        res.json({message: "Meta account connected successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}