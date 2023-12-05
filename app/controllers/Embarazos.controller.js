const Embarazo = require("../models/Embarazos.model.js");

// Create and Save a new Embarazo
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Embarazo
  const embarazo = new Embarazo({
    id_control_embarazo:req.body.id_control_embarazo,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    sexo: req.body.sexo,
    edad: req.body.edad,
    telefono: req.body.telefono,
    fecha: req.body.fecha,
    hora: req.body.hora,
    observaciones: req.body.observaciones,
  });

  // Save Embarazo in the database
  Embarazo.create(embarazo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Embarazo."
      });
    else res.send(data);
  });
};

// Retrieve all Embarazos from the database (with condition).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Embarazo.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving embarazos."
      });
    else res.send(data);
  });
};

// Find a single Embarazo by Nombre
exports.findOne = (req, res) => {
  Embarazo.findByNombre(req.params.nombre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Embarazo with nombre ${req.params.nombre}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Embarazo with nombre " + req.params.nombre
        });
      }
    } else res.send(data);
  });
};

// Update an Embarazo identified by the nombre in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Embarazo.updateById(
    req.params.id_control_embarazo,
    new Embarazo(req.body)
  )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Not found Embarazo with id_control_embarazo ${req.params.id_control_embarazo}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Embarazo with id_control_embarazo " + req.params.id_control_embarazo
      });
    });
};

// Delete an Embarazo with the specified nombre in the request
exports.delete = (req, res) => {
  Embarazo.remove(req.params.id_control_embarazo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró Embarazo con id_control_embarazos ${req.params.id_control_embarazo}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar Embarazos con id_control_embarazo " + req.params.id_control_embarazo
        });
      }
    } else {
      res.send({ message: `¡El embarazos se eliminó correctamente!` });
    }
  });
};


// Delete all Embarazos from the database.
exports.deleteAll = (req, res) => {
  Embarazo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all embarazos."
      });
    else res.send({ message: `All Embarazos were deleted successfully!` });
  });
};
