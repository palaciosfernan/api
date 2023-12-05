const sql = require("./db.js");

// constructor
const ControlUsuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.apellido = usuario.apellido;
  this.Statuss = usuario.Statuss;
  this.usuario = usuario.usuario;
  this.contraseña = usuario.contraseña;
};

ControlUsuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO ControlUsuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuario: ", { nombre: newUsuario.nombre, ...newUsuario });
    result(null, { nombre: newUsuario.nombre, ...newUsuario });
  });
};

ControlUsuario.findByNombre = (nombre, result) => {
  sql.query(`SELECT * FROM ControlUsuario WHERE nombre = '${nombre}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found usuario with the nombre
    result({ kind: "not_found" }, null);
  });
};

ControlUsuario.getAll = (result) => {
  sql.query("SELECT * FROM ControlUsuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

ControlUsuario.updateByNombre = (nombre, updatedUsuario, result) => {
  sql.query(
    "UPDATE ControlUsuario SET ? WHERE nombre = ?",
    [updatedUsuario, nombre],
    (err, res) => {
      if (err) {
        if (err.kind === "not_found") {
          result({ kind: "not_found" }, null);
        } else {
          result(err, null);
        }
      } else {
        console.log("updated usuario: ", { nombre, ...updatedUsuario });
        result(null, { nombre, ...updatedUsuario });
      }
    }
  );
};

ControlUsuario.remove = (nombre, result) => {
  sql.query("DELETE FROM ControlUsuario WHERE nombre = ?", nombre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found usuario with the nombre
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted usuario with nombre: ", nombre);
    result(null, res);
  });
};

ControlUsuario.removeAll = (result) => {
  sql.query("DELETE FROM ControlUsuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = ControlUsuario;
