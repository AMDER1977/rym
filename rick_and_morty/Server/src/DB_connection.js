require("dotenv").config(); //.env
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env; //!enviroment---> variables de entorno de ejecucion.

const UserModel = require("./models/User");
const FavoriteModel = require("./models/Favorite");

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
  { logging: false, native: false }
);

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
UserModel(sequelize);
FavoriteModel(sequelize);

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite } = sequelize.models;

//?relacion de muchos a muchos---tabla intermedia

User.belongsToMany(Favorite, { through: "user_favorite", timestamps: false });
Favorite.belongsToMany(User, { through: "user_favorite", timestamps: false });

module.exports = {
  User,
  Favorite,
  conn: sequelize,
};
