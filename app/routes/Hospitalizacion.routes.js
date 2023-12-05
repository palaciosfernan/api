module.exports = app => {
    const hospitalizacion = require("../controllers/Hospitalizacion.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Hospitalizacion
    router.post("/", hospitalizacion.create);
  
    // Retrieve all Hospitalizaciones
    router.get("/", hospitalizacion.findAll);
  
    // Retrieve all published Hospitalizaciones
    router.get("/published", hospitalizacion.findAllPublished);
  
    // Retrieve a single Hospitalizacion with nombre
    router.get("/:nombre", hospitalizacion.findOne);
  
    // Update a Hospitalizacion with nombre
    router.put("/:nombre", hospitalizacion.update);
    
    // Delete a Hospitalizacion with nombre
    router.delete("/:id_Hospitalizacion", hospitalizacion.delete);
  
    // Delete all Hospitalizaciones
    router.delete("/", hospitalizacion.deleteAll);
  
    app.use('/api/hospitalizacion', router);
  };
  