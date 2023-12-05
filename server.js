const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: ["http://localhost/3000", "http://localhost:5173"],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});
// Include Sesion routes
require("./app/routes/Sesion.routes.js")(app);

// Include Cita Agendada routes
require("./app/routes/CitaAgendada.routes.js")(app);

//include Embarazos routes
require("./app/routes/Embarazos.routes.js")(app);

//include Hospitalizacion routes
require("./app/routes/Hospitalizacion.routes.js")(app);

//include Control de usuario
require("./app/routes/ControlUsuario.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
