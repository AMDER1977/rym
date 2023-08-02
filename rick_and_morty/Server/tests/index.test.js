const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de Rutas", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await agent.get("/rickandmorty/character/1");
      const body = response.body;
      const attributes = [
        "id",
        "name",
        "species",
        "gender",
        "status",
        "origin",
        "image",
      ];

      attributes.forEach((attribute) => {
        expect(body).toHaveProperty(attribute);
      });
    });
    it("Si hay un error responde con estatus: 500", async () => {
      await agent.get("/rickandmorty/character/bartolo").expect(500);
    });
  });

  describe("GET/rickandmorty/login", () => {
    it("Informacion sea correcta y nos permita acceso", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?email=amder@gmail.com&password=1password"
      );
      expect(body.access).toBe(true);
    });
    it("Informacion sea incorrecta y nos bloquea acceso", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?email=amder@gmail.com&password=malpassword"
      );
      expect(body.access).toBe(false);
    });
  });

  describe("POST /rickandmorty/fav", () => {
    const characterAdd1 = { id: 1, name: "Ricky" };
    const characterAdd2 = { id: 2, name: "Mortyen" };

    it("Debe ser devuelto en un arreglo con el personaje", async () => {
      const { body } = await agent
        .post("/rickandmorty/fav")
        .send(characterAdd1);

      expect(body).toContainEqual(characterAdd1);
    });

    it("Si vuelves a enviar un nuevo elemento por body, este debe ser devuelto en un arreglo que incluye un elemento enviado previamente", async () => {
      const { body } = await agent
        .post("/rickandmorty/fav")
        .send(characterAdd2);

      expect(body).toContainEqual(characterAdd1);
      expect(body).toContainEqual(characterAdd2);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    const characterAdd1 = { id: 1, name: "Ricky" };
    const characterAdd2 = { id: 2, name: "Mortyen" };

    it("Debería devolver el mismno array si el ID no existe o es incorrec to", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/717171");

      expect(body).toContainEqual(characterAdd1);
      expect(body).toContainEqual(characterAdd2);
    });

    it("Elimina correctamente al personaje si se envía un ID válido", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/1");

      expect(body).not.toContainEqual(characterAdd1);
    });
  });
});
