const express = require("express");
const morgan = require("morgan");
const uuid = require("uuid");

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor arrancado ok!"));

app.set("view engine", "ejs");

const blogs = [
  {
    id: 1,
    title: "Primer Blog",
    resume: "Resumen del primer blog",
    body: "dfgsdfgñiijasdkfj ",
  },
  {
    id: 2,
    title: "Segundo Blog",
    resume: "Resumen del segundo blog",
    body: "dfgsdfgñiijasdkfj ",
  },
  {
    id: 3,
    title: "Tercer Blog",
    resume: "Resumen del tercero blog",
    body: "dfgsdfgñiijasdkfj ",
  },
];

app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Inicio", blogs });
});

app.post("/", (req, res) => {
  const blog = { id: uuid.v4(), ...req.body };
  blogs.push(blog);
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Crear un blog nuevo" });
});

app.get("/blog/:id", (req, res) => {
  const blog = blogs.find((blog) => blog.id == req.params.id);
  res.render("detail", { title: `Detalle del blog: (${blog.title})`, blog });
});

app.delete("/blog/:id", (req, res) => {
  blogs.forEach((blog, index) => {
    if (blog.id == req.params.id) {
      blogs.slice(index, 1);
    }
  });
  res.json({ redirect: "/" });
  res.send(`Elemento eleminado: ${req.params.id}`);
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
