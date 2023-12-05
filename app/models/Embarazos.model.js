const sql = require("./db.js");

const Embarazo = function (embarazo) {
  this.id_control_embarazo = embarazo.id_control_embarazo;
  this.nombre = embarazo.nombre;
  this.apellidos = embarazo.apellidos;
  this.sexo = embarazo.sexo;
  this.edad = embarazo.edad;
  this.telefono = embarazo.telefono;
  this.fecha = embarazo.fecha;
  this.hora = embarazo.hora;
  this.observaciones = embarazo.observaciones;
};

Embarazo.create = (newEmbarazo, result) => {
  sql.query("INSERT INTO Embarazos SET ?", newEmbarazo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Embarazo: ", { nombre: newEmbarazo.nombre, ...newEmbarazo });
    result(null, { nombre: newEmbarazo.nombre, ...newEmbarazo });
  });
};

Embarazo.findByNombre = (nombre, result) => {
  sql.query(`SELECT * FROM Embarazos WHERE nombre = '${nombre}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Embarazo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Embarazo with the nombre
    result({ kind: "not_found" }, null);
  });
};

Embarazo.getAll = (nombre, result) => {
  let query = "SELECT * FROM Embarazos";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Embarazos: ", res);
    result(null, res);
  });
};

Embarazo.updateById = (id_control_embarazo, updatedEmbarazo) => {
  return new Promise((resolve, reject) => {
    const {
      apellidos,
      sexo,
      fecha,
      hora,
      edad,
      telefono,
      observaciones,
      nombre: nuevoNombre
    } = updatedEmbarazo;

    console.log('Updating Embarazo:', { nombre: nuevoNombre, ...updatedEmbarazo });

    sql.query(
      'UPDATE Embarazos SET  apellidos = ?, sexo = ?, fecha = ?, hora = ?, edad = ?, telefono = ?, observaciones = ?,nombre = ? WHERE id_control_embarazo = ?',
      [ apellidos, sexo, fecha, hora, edad, telefono, observaciones,nuevoNombre, id_control_embarazo],
      (err, res) => {
        if (err) {
          console.error('Error updating Embarazo:', err);
          reject(err);
        } else {
          if (res.affectedRows === 0) {
            // No se encontró el Embarazo con el id_control_embarazo proporcionado
            reject({ kind: "not_found" });
          } else {
            console.log('Updated Embarazo:', { nombre: nuevoNombre, ...updatedEmbarazo });
            resolve({ nombre: nuevoNombre, ...updatedEmbarazo });
          }
        }
      }
    );
  });
};


Embarazo.remove = (id_control_embarazo, result) => {
  sql.query('DELETE FROM Embarazos WHERE id_control_embarazo = ?', [id_control_embarazo], (err, res) => {
    if (err) {
      console.error('Error deleting Embarazo:', err);
      result({ error: 'Error deleting Embarazo' });
      return;
    }

    if (res.affectedRows === 0) {
      // No se encontró la Embarazo con el id_control_embarazo
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted embarazos with id_control_embarazo:', id_control_embarazo);
    result(null, res);
  });
};

Embarazo.removeAll = (result) => {
  sql.query("DELETE FROM Embarazos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Embarazos`);
    result(null, res);
  });
};

// Add other Embarazo query functions as needed

module.exports = Embarazo;
