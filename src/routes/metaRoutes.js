import express from "express"
import { connectMeta, metaCallback } from "../controllers/metaController.js"
import { authenticate } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/connect", authenticate, connectMeta)
router.get("/callback", metaCallback)

router.get("/webhook", (req, res) => {
    console.log("hook triggered")
    
    const VERIFY_TOKEN = "metatoverifytokenstring";

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    console.log(challenge);
    

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    } else {
        return res.sendStatus(403);
    }
})

export default router