const express = require("express")
const router  = express.Router()
const {verifytoken} = require("../auth/jwt")
const { like } = require("../controllers/like_dislike")

router.post("/like", verifytoken,like)


module.exports = router


