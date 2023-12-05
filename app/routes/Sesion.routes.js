module.exports = app => {
  const sesiones = require("../controllers/Sesion.controller.js");

  var router = require("express").Router();

  // Create a new Sesion
  router.post("/", sesiones.create);

  // Retrieve all Sesiones
  router.get("/", sesiones.findAll);

  // Update a Sesion with usuario
  router.put("/:usuario", sesiones.update);

  // Delete a Sesion with usuario
  router.delete("/:usuario", sesiones.delete);

  // Retrieve a single Sesion with usuario
  router.get("/:usuario", sesiones.findOne);

  // Delete all Sesiones
  router.delete("/", sesiones.deleteAll);

  app.use('/api/sesiones', router);
};
