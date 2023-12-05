const CitaAgendada = require("../models/CitaAgendada.model.js");

// Create and Save a new CitaAgendada
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a CitaAgendada
  const citaAgendada = new CitaAgendada({
    Id_Pacientes: req.body.Id_Pacientes, // Cambiado de Id_Paciente a Id_Pacientes
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    sexo: req.body.sexo,
    edad: req.body.edad,
    fecha: req.body.fecha,
    telefono: req.body.telefono,
    hora: req.body.hora,
    motivo: req.body.motivo,
  });

  // Save CitaAgendada in the database
  CitaAgendada.create(citaAgendada)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the CitaAgendada."
      });
    });
};

// Retrieve all CitaAgendadas from the database (with condition).
exports.findAll = (req, res) => {
  const motivo = req.query.motivo;

  CitaAgendada.getAll(motivo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving citaAgendadas."
      });
    });
};

// Find a single CitaAgendada by nombre
exports.findOne = (req, res) => {
  CitaAgendada.findByNombre(req.params.nombre) // Cambiado de findBynombre a findByNombre
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Not found CitaAgendada with nombre ${req.params.nombre}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving CitaAgendada with nombre " + req.params.nombre
      });
    });
};

// Update a CitaAgendada identified by the Id_Pacientes in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Update CitaAgendada by Id_Pacientes
  CitaAgendada.updateById(
    req.params.Id_Paciente,
    new CitaAgendada(req.body)
  )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Not found CitaAgendada with Id_Paciente ${req.params.Id_Paciente}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CitaAgendada with Id_Paciente " + req.params.Id_Paciente
      });
    });
};

// Delete a CitaAgendada with the specified Id_Pacientes in the request
exports.delete = (req, res) => {
  CitaAgendada.remove(req.params.Id_Paciente)
    .then((data) => {
      if (data) {
        res.send({ message: `CitaAgendada was deleted successfully!` });
      } else {
        res.status(404).send({
          message: `Not found CitaAgendada with Id_Paciente ${req.params.Id_Paciente}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete CitaAgendada with Id_Paciente " + req.params.Id_Paciente
      });
    });
};

// Delete all CitaAgendadas from the database.
exports.deleteAll = (req, res) => {
  CitaAgendada.removeAll()
    .then((data) => {
      res.send({ message: `All CitaAgendadas were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all citaAgendadas."
      });
    });
};
