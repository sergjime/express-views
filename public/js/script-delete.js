const del = document.querySelector(".delete");
del.addEventListener("click", () => {
  const ruta = `/blog/${del.dataset.id}`;
  fetch(ruta, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => (window.location.href = data.redirect))
    .catch((err) => console.log(err));
});
