const express = require("express");
const router = express.Router();
const { createAdmin, adminLogin } = require("../controllers/userController");
const {
  createBlog,
  getBlogs,
  getIndividualBlog,
} = require("../controllers/blogController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/create-admin", createAdmin);
router.post("/admin-login", adminLogin);
router.post("/create-blog", verifyToken, createBlog);
router.get("/get-blogs", getBlogs);
router.get("/get-individual-blog/:slug", getIndividualBlog);

module.exports = router;
