module.exports = (app) => {
  const embarazos = require("../controllers/Embarazos.controller.js");

  var router = require("express").Router();

  // Create a new Embarazo
  router.post("/", embarazos.create);

  // Retrieve all Embarazos
  router.get("/", embarazos.findAll);

  // Retrieve a single Embarazo with nombre
  router.get("/:nombre", embarazos.findOne);

  // Update an Embarazo with nombre
  router.put("/:id_control_embarazo", embarazos.update);

  // Delete an Embarazo with nombre
  router.delete("/:id_control_embarazo", embarazos.delete);
  // Delete all Embarazos 
  router.delete("/", embarazos.deleteAll);

  app.use("/api/embarazos", router);
};
