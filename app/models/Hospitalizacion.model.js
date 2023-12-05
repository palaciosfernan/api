  const sql = require("./db.js");

  // constructor
  const Hospitalizacion = function(hospitalizacion) {
    this.id_Hospitalizacion=hospitalizacion.Hospitalizacion;
    this.nombre = hospitalizacion.nombre;
    this.apellido = hospitalizacion.apellido;
    this.sexo = hospitalizacion.sexo;
    this.edad = hospitalizacion.edad;
    this.telefono = hospitalizacion.telefono;
    this.cita_agendada = hospitalizacion.cita_agendada;
    this.hora_programada = hospitalizacion.hora_programada;
    this.fecha_de_ingreso = hospitalizacion.fecha_de_ingreso;
    this.hora_de_ingreso = hospitalizacion.hora_de_ingreso;
    this.fecha_de_egreso = hospitalizacion.fecha_de_egreso;
    this.hora_de_egreso = hospitalizacion.hora_de_egreso;
    this.numero_de_cuarto = hospitalizacion.numero_de_cuarto;
    this.numero_de_cama = hospitalizacion.numero_de_cama;
    this.grupo_sanguineo = hospitalizacion.grupo_sanguineo;
    this.escolaridad = hospitalizacion.escolaridad;
    this.alergia = hospitalizacion.alergia;
    this.observaciones = hospitalizacion.observaciones;
    this.medicamentos_recetados = hospitalizacion.medicamentos_recetados;
    this.presion_arterial = hospitalizacion.presion_arterial;
    this.frecuencia_cardiaca = hospitalizacion.frecuencia_cardiaca;
    this.temperatura_corporal = hospitalizacion.temperatura_corporal;
    this.peso = hospitalizacion.peso;
  };
  Hospitalizacion.create = (newHospitalizacion, result) => {
    sql.query("INSERT INTO Hospitalizacion SET ?", newHospitalizacion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Hospitalización creada: ", { nombre: newHospitalizacion.nombre, ...newHospitalizacion });
      result(null, { nombre: newHospitalizacion.nombre, ...newHospitalizacion });
    });
  };
  
  // Método para buscar una hospitalización por nombre
  Hospitalizacion.findByNombre = (nombre, result) => {
    sql.query(`SELECT * FROM Hospitalizacion WHERE nombre = '${nombre}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Hospitalización encontrada: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // No se encontró la hospitalización con el nombre especificado
      result({ kind: "not_found" }, null);
    });
  };
  
  // Método para obtener todas las hospitalizaciones o filtrar por nombre
  Hospitalizacion.getAll = (nombre, result) => {
    let query = "SELECT * FROM Hospitalizacion";
  
    if (nombre) {
      query += ` WHERE nombre LIKE '%${nombre}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Hospitalizaciones: ", res);
      result(null, res);
    });
  };
  
  // Método para actualizar una hospitalización por nombre
  Hospitalizacion.updateByNombre = (nombre, hospitalizacion, result) => {
    sql.query(
      "UPDATE Hospitalizacion SET nombre = ?, apellido = ?, sexo = ?, edad = ?, telefono = ?, cita_agendada = ?, hora_programada = ?, fecha_de_ingreso = ?, hora_de_ingreso = ?, fecha_de_egreso = ?, hora_de_egreso = ?, numero_de_cuarto = ?, numero_de_cama = ?, grupo_sanguineo = ?, escolaridad = ?, alergia = ?, observaciones = ?, medicamentos_recetados = ?, presion_arterial = ?, frecuencia_cardiaca = ?, temperatura_corporal = ?, peso = ? WHERE nombre = ?",
      [
        hospitalizacion.nombre,
        hospitalizacion.apellido,
        hospitalizacion.sexo,
        hospitalizacion.edad,
        hospitalizacion.telefono,
        hospitalizacion.cita_agendada,
        hospitalizacion.hora_programada,
        hospitalizacion.fecha_de_ingreso,
        hospitalizacion.hora_de_ingreso,
        hospitalizacion.fecha_de_egreso,
        hospitalizacion.hora_de_egreso,
        hospitalizacion.numero_de_cuarto,
        hospitalizacion.numero_de_cama,
        hospitalizacion.grupo_sanguineo,
        hospitalizacion.escolaridad,
        hospitalizacion.alergia,
        hospitalizacion.observaciones,
        hospitalizacion.medicamentos_recetados,
        hospitalizacion.presion_arterial,
        hospitalizacion.frecuencia_cardiaca,
        hospitalizacion.temperatura_corporal,
        hospitalizacion.peso,
        nombre // Utilizar el nombre original para la cláusula WHERE
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        console.log("Hospitalización actualizada: ", { nombre: nombre, ...hospitalizacion });
        result(null, { nombre: nombre, ...hospitalizacion });
      }
    );
  };
  
  // Método para eliminar una hospitalización por nombre
  Hospitalizacion.remove = (id_Hospitalizacion, result) => {
    sql.query('DELETE FROM hospitalizacion WHERE id_Hospitalizacion = ?', [id_Hospitalizacion], (err, res) => {
      if (err) {
        console.error('Error deleting Embarazo:', err);
        result({ error: 'Error deleting Embarazo' });
        return;
      }
  
      if (res.affectedRows === 0) {
        // No se encontró la Embarazo con el id_Hospitalizacion
        result({ kind: 'not_found' }, null);
        return;
      }
  
      console.log('Deleted hospitalizacion with id_Hospitalizacion:', id_Hospitalizacion);
      result(null, res);
    });
  };
  
  // Método para eliminar todas las hospitalizaciones
  Hospitalizacion.removeAll = result => {
    sql.query("DELETE FROM Hospitalizacion", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`Eliminadas ${res.affectedRows} hospitalizaciones`);
      result(null, res);
    });
  };
  
  module.exports = Hospitalizacion;