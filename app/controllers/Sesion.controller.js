const Sesion = require("../models/Sesion.model.js");

// Crear y guardar una nueva Sesión
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  // Crear una Sesión
  const sesion = new Sesion({
    usuario: req.body.usuario,
    contraseña: req.body.contraseña
  });

  // Guardar la Sesión en la base de datos
  Sesion.create(sesion, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la Sesión."
      });
    else res.send(data);
  });
};

// Obtener todas las Sesiones de la base de datos
exports.findAll = (req, res) => {
  Sesion.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las sesiones."
      });
    else res.send(data);
  });
};

// Encontrar una única Sesión por Usuario
exports.findOne = (req, res) => {
  Sesion.findByUsuario(req.params.usuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró la Sesión con usuario ${req.params.usuario}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar la Sesión con usuario " + req.params.usuario
        });
      }
    } else res.send(data);
  });
};

// Actualizar una Sesión identificada por el usuario en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  Sesion.updateByUsuario(
    req.params.usuario,
    new Sesion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró la Sesión con usuario ${req.params.usuario}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar la Sesión con usuario " + req.params.usuario
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar una Sesión con el usuario especificado en la solicitud
exports.delete = (req, res) => {
  Sesion.removeByUsuario(req.params.usuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró la Sesión con usuario ${req.params.usuario}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la Sesión con usuario " + req.params.usuario
        });
      }
    } else res.send({ message: `¡La Sesión se eliminó correctamente!` });
  });
};

// Eliminar todas las Sesiones de la base de datos
exports.deleteAll = (req, res) => {
  Sesion.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todas las sesiones."
      });
    else res.send({ message: `Todas las Sesiones se eliminaron correctamente.` });
  });
};
