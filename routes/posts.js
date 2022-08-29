const express = require("express");
const router = express.Router();
const { verifytoken } = require("../auth/jwt");
const {
  list_post,
  create_post,
  get_post_by_id,
  getAllPostsBy_user_id,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.get("/getAllpost", verifytoken, list_post);
router.get("/getpostBy/:id", verifytoken, get_post_by_id);
router.get("/post/user_id/:user_id", verifytoken, getAllPostsBy_user_id);
router.post("/createPost", verifytoken, create_post);
router.put("/updatePost/:post_id",verifytoken,updatePost)
router.delete("/deletePost/:post_id",verifytoken,deletePost)
module.exports = router;
