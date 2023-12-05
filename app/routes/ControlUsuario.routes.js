module.exports = app => {
    const controlUsuarios = require("../controllers/ControlUsuario.controller.js");
  
    var router = require("express").Router();
  
    // Create a new ControlUsuario
    router.post("/", controlUsuarios.create);
  //rds
  //api 
    // Retrieve all ControlUsuarios
    router.get("/", controlUsuarios.findAll);
  
    // Retrieve a single ControlUsuario with nombren
    router.get("/:nombre", controlUsuarios.findOne);
  
    // Update a ControlUsuario with nombre
    router.put("/:nombre", controlUsuarios.update);
  
    // Delete a ControlUsuario with nombre
    router.delete("/:nombre", controlUsuarios.delete);
  
    // Delete all ControlUsuarios
    router.delete("/", controlUsuarios.deleteAll);
  
    app.use('/api/controlusuarios', router);
  };
  