const sql = require("./db.js");

// Constructor
const Sesion = function(sesion) {
  this.usuario = sesion.usuario;
  this.contraseña = sesion.contraseña;
};

Sesion.create = (newSesion, result) => {
  sql.query("INSERT INTO Sesion SET ?", newSesion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("sesión creada: ", { usuario: newSesion.usuario, ...newSesion });
    result(null, { usuario: newSesion.usuario, ...newSesion });
  });
};

Sesion.findByUsuario = (usuario, result) => {
  sql.query(`SELECT * FROM Sesion WHERE usuario = '${usuario}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("sesión encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // No se encontró la sesión con el usuario proporcionado
    result({ kind: "not_found" }, null);
  });
};

Sesion.getAll = result => {
  sql.query("SELECT * FROM Sesion", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sesiones: ", res);
    result(null, res);
  });
};

Sesion.updateByUsuario = (usuario, sesion, result) => {
  sql.query(
    "UPDATE Sesion SET contraseña = ? WHERE usuario = ?",
    [sesion.contraseña, usuario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró la sesión con el usuario proporcionado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("sesión actualizada: ", { usuario: usuario, ...sesion });
      result(null, { usuario: usuario, ...sesion });
    }
  );
};

Sesion.removeByUsuario = (usuario, result) => {
  sql.query("DELETE FROM Sesion WHERE usuario = ?", usuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // No se encontró la sesión con el usuario proporcionado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("sesión eliminada con usuario: ", usuario);
    result(null, res);
  });
};

Sesion.removeAll = result => {
  sql.query("DELETE FROM Sesion", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`eliminadas ${res.affectedRows} sesiones`);
    result(null, res);
  });
};

module.exports = Sesion;
