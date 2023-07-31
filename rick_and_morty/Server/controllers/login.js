const users = require("../utils/users.js");

const login = (req, res) => {
  const { email, password } = req.query;

  let found = users.find(
    (users) => users.email === email && users.password === password
  );

  const access = found ? true : false;
  res.status(200).json({ access });
};

module.exports = login;
