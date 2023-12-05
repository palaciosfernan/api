const Hospitalizacion = require("../models/Hospitalizacion.model.js");

// Create and Save a new Hospitalizacion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Hospitalizacion
  const hospitalizacion = new Hospitalizacion({
    id_Hospitalizacion:req.body.id_Hospitalizacion,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    sexo: req.body.sexo,
    edad: req.body.edad,
    telefono: req.body.telefono,
    cita_agendada: req.body.cita_agendada,
    hora_programada: req.body.hora_programada,
    id_Medida: req.body.id_Medida,
    fecha_de_ingreso: req.body.fecha_de_ingreso,
    hora_de_ingreso: req.body.hora_de_ingreso,
    fecha_de_egreso: req.body.fecha_de_egreso,
    hora_de_egreso: req.body.hora_de_egreso,
    numero_de_cuarto: req.body.numero_de_cuarto,
    numero_de_cama: req.body.numero_de_cama,
    grupo_sanguineo: req.body.grupo_sanguineo,
    escolaridad: req.body.escolaridad,
    alergia: req.body.alergia,
    observaciones: req.body.observaciones,
    medicamentos_recetados: req.body.medicamentos_recetados,
    presion_arterial: req.body.presion_arterial,
    frecuencia_cardiaca: req.body.frecuencia_cardiaca,
    temperatura_corporal: req.body.temperatura_corporal,
    peso: req.body.peso
  });

  // Save Hospitalizacion in the database
  Hospitalizacion.create(hospitalizacion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Hospitalizacion."
      });
    else res.send(data);
  });
};

// Retrieve all Hospitalizaciones from the database (with condition).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Hospitalizacion.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hospitalizaciones."
      });
    else res.send(data);
  });
};

// Find a single Hospitalizacion by Nombre
exports.findOne = (req, res) => {
  Hospitalizacion.findByNombre(req.params.nombre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Hospitalizacion with nombre ${req.params.nombre}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Hospitalizacion with nombre " + req.params.nombre
        });
      }
    } else res.send(data);
  });
};

// find all published Hospitalizaciones
exports.findAllPublished = (req, res) => {
  Hospitalizacion.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hospitalizaciones."
      });
    else res.send(data);
  });
};

// Update a Hospitalizacion identified by the nombre in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Hospitalizacion.updateByNombre(
    req.params.nombre,
    new Hospitalizacion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Hospitalizacion with nombre ${req.params.nombre}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Hospitalizacion with nombre " + req.params.nombre
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Hospitalizacion with the specified nombre in the request
exports.delete = (req, res) => {
  Hospitalizacion.remove(req.params.id_Hospitalizacion, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró hospitalizacion con id_Hospitalizacions ${req.params.id_Hospitalizacion}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la hospitalizacion con id_Hospitalizacion " + req.params.id_Hospitalizacion
        });
      }
    } else {
      res.send({ message: `¡El hospitalizacion se eliminó correctamente!` });
    }
  });
};

// Delete all Hospitalizaciones from the database.
exports.deleteAll = (req, res) => {
  Hospitalizacion.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all hospitalizaciones."
      });
    else res.send({ message: `All Hospitalizaciones were deleted successfully!` });
  });
};
