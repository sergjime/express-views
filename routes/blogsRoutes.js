const express = require("express");
const blogs = require("../models/blogs");
const blogController = require("../controllers/blogsController");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Inicio", blogs });
});

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
