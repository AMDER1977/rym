let myFavorites = [];

const postFav = (req, res) => {
  const character = req.body;

  myFavorites.push(character);
  res.status(200).json(myFavorites);
};

const deleteFav = (req, res) => {
  const { id } = req.params;

  const deleteCharacter = myFavorites.filter(
    (character) => character.id !== Number(id)
  );

  myFavorites = deleteCharacter;
  res.status(200).json(myFavorites);
};

module.exports = {
  postFav,
  deleteFav,
};
