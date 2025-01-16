const express = require("express");
const router = express.Router();
const { createAdmin, adminLogin } = require("../controllers/userController");
const {
  createBlog,
  getBlogs,
  getIndividualBlog,
  getTags,
  getTagBlogs,
  deleteBlog,
} = require("../controllers/blogController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/create-admin", createAdmin);
router.post("/admin-login", adminLogin);
router.post("/create-blog", verifyToken, createBlog);
router.get("/get-blogs", getBlogs);
router.get("/get-individual-blog/:slug", getIndividualBlog);
router.get("/get-tags", getTags);
router.get("/get-blogs-by-tag/:tag", getTagBlogs);
router.delete("/delete-blog/:blogId",verifyToken, deleteBlog)

module.exports = router;
