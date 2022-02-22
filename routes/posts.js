const express = require("express")
const router  = express.Router()
const {verifytoken} = require("../auth/jwt")
const { list_post, create_post, get_by_id, get_post_by_id } = require("../controllers/posts")

// router.post("/post",create_post)
router.get("/post", verifytoken,list_post)
router.get("/post/:id",verifytoken,get_post_by_id)

router.post("/post", verifytoken,create_post)


module.exports = router