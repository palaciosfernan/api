const ControlUsuario = require("../models/ControlUsuario.model.js");

// Create and Save a new Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Usuario
  const usuario = new ControlUsuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    Statuss: req.body.Statuss,
    usuario: req.body.usuario,
    contraseña: req.body.contraseña
  });

  // Save Usuario in the database
  ControlUsuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Usuario."
      });
    else res.send(data);
  });
};

// Retrieve all Usuarios from the database
exports.findAll = (req, res) => {
  ControlUsuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving usuarios."
      });
    else res.send(data);
  });
};

// Find a single Usuario by Nombre
exports.findOne = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      return res.status(400).json({
        message: 'Usuario y contraseña son campos obligatorios.',
      });
    }

    const foundUsuario = await ControlUsuario.findOne({
      where: {
        usuario,
        contraseña: contraseña,
      },
    });

    if (foundUsuario) {
      res.status(200).json({ autenticacionExitosa: true });
    } else {
      res.status(401).json({ autenticacionExitosa: false });
    }
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Update a Usuario identified by the nombre in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const updatedUsuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    Statuss: req.body.Statuss,
    usuario: req.body.usuario,
    contraseña: req.body.contraseña
    // Add other fields that you want to update
  };

  ControlUsuario.updateByNombre(
    req.params.nombre,
    updatedUsuario,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Usuario with nombre ${req.params.nombre}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Usuario with nombre " + req.params.nombre
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Usuario with the specified nombre in the request
exports.delete = (req, res) => {
  ControlUsuario.remove(req.params.nombre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuario with nombre ${req.params.nombre}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Usuario with nombre " + req.params.nombre
        });
      }
    } else res.send({ message: `Usuario was deleted successfully!` });
  });
};

// Delete all Usuarios from the database.
exports.deleteAll = (req, res) => {
  ControlUsuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all usuarios."
      });
    else res.send({ message: `All Usuarios were deleted successfully!` });
  });
};
