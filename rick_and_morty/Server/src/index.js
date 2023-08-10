const server = require("./app");
const { conn } = require("./DB_connection");
const PORT = 3001;

server.listen(PORT, () => {
  conn.sync({ force: true });
  console.log("server raised on port" + " " + PORT);
});
