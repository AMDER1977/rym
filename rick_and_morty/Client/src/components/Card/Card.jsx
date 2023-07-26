import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "../../redux/actions";

import style from "./card.module.css";

function Card(props) {
  const navigate = useNavigate();
  const { character, onClose, addFavorite, removeFavorite, favorites } = props;

  const [closeBtn, setCloseBtn] = useState(true);
  const [isFav, setFav] = useState(false);

  useEffect(() => {
    if (!onClose) {
      setCloseBtn(false);
    }
  }, []);

  useEffect(() => {
    favorites.forEach((isFav) => {
      if (isFav.id === character.id) {
        setFav(true);
      }
    });
  }, [favorites]);

  function navigateHandler() {
    navigate(`/detail/${character.id}`);
  }

  function handleFavorite(data) {
    if (!isFav) {
      addFavorite(data);
      setFav(true);
    } else {
      removeFavorite(data);
      setFav(false);
    }
  }

  return (
    <div className={style.cardContainer}>
      <div className={style.imageContainer}>
        <img
          className={style.characterImage}
          src={character.image}
          alt={character.name}
          onClick={navigateHandler}
        />
        <h2 className={style.nameId}>Name: {character.name}</h2>

        {isFav ? (
          <button onClick={() => handleFavorite(character.id)}>❤️</button>
        ) : (
          <button onClick={() => handleFavorite(character)}>🤍</button>
        )}
        {closeBtn && (
          <button
            className={style.closeButton}
            onClick={() => {
              onClose(character.id);
            }}
          >
            X
          </button>
        )}
      </div>

      <div className={style.atributes}>
        <h2>{character.species}</h2>
        <h2>{character.gender}</h2>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => dispatch(addFavorite(character)),

    removeFavorite: (id) => dispatch(removeFavorite(id)),
  };
};
const mapStateToProps = (state) => {
  return {
    favorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
