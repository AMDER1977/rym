const http = require("http");
const characters = require("../../Server/utils/data");
const PORT = 3001;

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url.includes("/rickandmorty/character")) {
      const id = req.url.split("/").pop();
      let characterFilter = characters.filter(
        (character) => character.id === Number(id)
      );
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(characterFilter));
    }
  })
  .listen(PORT, () => console.log("Server running on port 3001"));
