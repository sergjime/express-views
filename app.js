require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogsRoutes = require("./routes/blogsRoutes");
const blogsController = require("./controllers/blogsController");
const PORT = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a Atlas");
    app.listen(PORT, () => console.log("Servidor arrancado ok!"));
  })
  .catch((err) => console.log(err));

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
