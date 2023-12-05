module.exports = app => {
    const citaAgendadaController = require("../controllers/CitaAgendada.controller.js");

    var router = require("express").Router();

    // Create a new CitaAgendada
    router.post("/", citaAgendadaController.create);

    // Retrieve all CitaAgendadas
    router.get("/", citaAgendadaController.findAll);

    // Retrieve a single CitaAgendada by Id_Paciente
    router.get("/:Id_Paciente", citaAgendadaController.findOne);

    // Update a CitaAgendada by Id_Paciente
    router.put("/:Id_Paciente", citaAgendadaController.update);

    router.delete("/:Id_Paciente", citaAgendadaController.delete);

    // Delete all CitaAgendadas
    router.delete("/", citaAgendadaController.deleteAll);

    // Middleware para manejar errores de JSON malformado
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            return res.status(400).json({ error: 'Solicitud JSON malformada' });
        }
        next();
    });

    app.use('/api/citaAgendadas', router);
};
