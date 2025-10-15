const express = require('express');
const routerApi = require('./routes/rutas');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/" , (req, res) => {
  res.send("Hola desde mi server Express");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Esta es una nueva ruta");
});


routerApi(app);

app.get("/categories/:categoryid/products/:productsid", (req, res) => {
  const {categoryid, productsid} = req.params;
  res.json({
    categoryid,
    productsid
  })
});

app.get("/users", (req, res) => {
  const {username,lastname } = req.query;
  if (username && lastname) {
    res.json({
      username,
      lastname
    });
  }
  else {
    res.send("No hay nombre y/o apellido")
  }
})

app.listen(port, () => {
  console.log("Server started on port " + port);
});


/*
api.example.com/task/{id} Muestra la tarea del id
api.example.com/user/{id} Muestra el usuario del id
api.
*/
