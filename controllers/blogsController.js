const blogs = require("../models/blogs");
const uuid = require("uuid");

const blog_index = (req, res) => {
  res.render("index", { title: "Inicio", blogs });
};

const blog_details = (req, res) => {
  const blog = blogs.find((blog) => blog.id == req.params.id);
  res.render("detail", { title: `Detalle del blog: (${blog.title})`, blog });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Crear un blog nuevo" });
};

const blog_create_post = (req, res) => {
  const blog = { id: uuid.v4(), ...req.body };
  blogs.push(blog);
  res.redirect("/");
};

const blog_delete = (req, res) => {
  blogs.forEach((blog, index) => {
    if (blog.id == req.params.id) {
      blogs.slice(index, 1);
    }
  });
  res.json({ redirect: "/" });
  res.send(`Elemento eleminado: ${req.params.id}`);
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
