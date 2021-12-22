const express = require("express");
const morgan = require("morgan");
const blogsRoutes = require("./routes/blogsRoutes");
const blogsController = require("./controllers/blogsController");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor arrancado ok!"));

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", blogsController.blog_index);

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.use("/blog", blogsRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
