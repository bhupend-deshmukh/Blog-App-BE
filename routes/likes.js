const express = require("express")
const router  = express.Router()
const {verifytoken} = require("../auth/jwt")



const { like } = require("../controllers/likes")

router.post("/like", verifytoken,like)


module.exports = router