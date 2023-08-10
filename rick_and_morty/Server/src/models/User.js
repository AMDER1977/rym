const { DataTypes } = require("sequelize");

//?sequelize es la instancia que recibe

module.exports = (sequelize) => {
  //todo: a partir de esa instancia definimos el modelo
  sequelize.define(
    "User",
    {
      //!atributos
      id: {
        type: DataTypes.INTEGER, //*tipo de datos
        allowNull: false, //*constraist
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false } //* propiedad para eliminar los campos por default creados por la BD
  );
};
