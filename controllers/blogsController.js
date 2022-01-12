const Blog = require("../models/Blog");

const blog_index = (req, res) => {
  Blog.find()
    .then((result) => res.render("index", { title: "Inicio", blogs: result }))
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) =>
      res.render("detail", {
        title: `Detalle del blog: (${result.title})`,
        blog: result,
      })
    )
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Blog no encontrado" });
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Crear un blog nuevo" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      console.log("Registro guardado", result);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const blog_update_get = (req, res) => {
  Blog.findById(req.params.id).then((result) =>
    res.render("update", {
      title: `Editar el blog: (${result.title})`,
      blog: result,
    })
  );
};

const blog_update_post = (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect("/blog/" + req.params.id))
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(res.json({ redirect: "/" }))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_update_get,
  blog_update_post,
  blog_delete,
};
