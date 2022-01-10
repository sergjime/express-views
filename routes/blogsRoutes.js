const express = require("express");
const blogs = require("../models/Blog");
const blogController = require("../controllers/blogsController");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Inicio", blogs });
});

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/update/:id", blogController.blog_update_get);

router.post("/update/:id", blogController.blog_update_post);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
