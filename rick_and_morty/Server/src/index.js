//*solo se tiene aca al puerto escuchando y la conexion a la BD

const server = require("./app");
const { conn } = require("./DB_connection");
const PORT = 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("server raised on port" + " " + PORT);
  });
});
