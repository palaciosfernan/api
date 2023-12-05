const sql = require("./db.js");

// constructor
const CitaAgendada = function (cita) {
  this.Id_Paciente = cita.Id_Paciente;
  this.nombre = cita.nombre;
  this.apellidos = cita.apellidos;
  this.sexo = cita.sexo;
  this.edad = cita.edad;
  this.fecha = cita.fecha;
  this.telefono = cita.telefono;
  this.hora = cita.hora;
  this.motivo = cita.motivo;
};

CitaAgendada.create = (newCita) => {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO Cita_agendada SET ?', [newCita], (err, res) => {
      if (err) {
        console.error('Error creating cita_agendada:', err);
        reject(err);
        return;
      }

      console.log('Created cita_agendada:', { nombre: newCita.nombre, ...newCita });
      resolve({ nombre: newCita.nombre, ...newCita });
    });
  });
};

CitaAgendada.findByNombre = (nombre) => {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM Cita_agendada WHERE nombre = ?', [nombre], (err, res) => {
      if (err) {
        console.error('Error finding cita_agendada:', err);
        reject(err);
        return;
      }

      if (res.length) {
        console.log('Found cita_agendada:', res[0]);
        resolve(res[0]);
      } else {
        resolve(null);
      }
    });
  });
};

CitaAgendada.getAll = (motivo) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM Cita_agendada';

    if (motivo) {
      query += ' WHERE motivo LIKE ?';
      sql.query(query, [`%${motivo}%`], (err, res) => {
        if (err) {
          console.error('Error getting cita_agendada:', err);
          reject(err);
        } else {
          console.log('Cita_agendada:', res);
          resolve(res);
        }
      });
    } else {
      sql.query(query, (err, res) => {
        if (err) {
          console.error('Error getting cita_agendada:', err);
          reject(err);
        } else {
          console.log('Cita_agendada:', res);
          resolve(res);
        }
      });
    }
  });
};

CitaAgendada.updateById = (Id_Paciente, nuevaCita) => {
  return new Promise((resolve, reject) => {
    const {
      apellidos,
      motivo,
      sexo,
      fecha,
      hora,
      edad,
      telefono,
      nombre: nuevoNombre // Nombre actualizado
    } = nuevaCita;

    console.log('Updating cita_agendada:', { nombre: nuevoNombre, ...nuevaCita });

    sql.query(
      'UPDATE Cita_agendada SET apellidos = ?, motivo = ?, sexo = ?, fecha = ?, hora = ?, edad = ?, telefono = ?, nombre = ? WHERE Id_Paciente = ?',
      [apellidos, motivo, sexo, fecha, hora, edad, telefono, nuevoNombre, Id_Paciente],
      (err, res) => {
        if (err) {
          console.error('Error updating cita_agendada:', err);
          reject(err);
        } else {
          if (res.affectedRows === 0) {
            // No se encontró la cita_agendada con el Id_Paciente proporcionado
            resolve(null);
          } else {
            console.log('Updated cita_agendada:', { nombre: nuevoNombre, ...nuevaCita });
            resolve({ nombre: nuevoNombre, ...nuevaCita });
          }
        }
      }
    );
  });
};

CitaAgendada.remove = (Id_Paciente) => {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM Cita_agendada WHERE Id_Paciente = ?', [Id_Paciente], (err, res) => {
      if (err) {
        console.error('Error deleting cita_agendada:', err);
        reject(err);
        return;
      }

      if (res.affectedRows === 0) {
        // No se encontró la cita_agendada con el Id_Paciente
        resolve(null);
      } else {
        console.log('Deleted cita_agendada with Id_Paciente:', Id_Paciente);
        resolve(res);
      }
    });
  });
};

CitaAgendada.removeAll = () => {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM Cita_agendada', (err, res) => {
      if (err) {
        console.error('Error deleting all cita_agendadas:', err);
        reject(err);
        return;
      }

      console.log(`Deleted ${res.affectedRows} cita_agendadas`);
      resolve(res);
    });
  });
};

module.exports = CitaAgendada;
