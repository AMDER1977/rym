import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFavorite } from "./redux/actions";
import Detail from "./views/detail/detail";
import About from "./views/about/about";
import Cards from "./components/Cards/Cards";
import logoRM from "../src/Rick-And-Morty-Logo-Transparent-File.png";
import NavBar from "./components/NavBar/NavBar";
import ErrorPage from "./views/error/errorpage";
import LandingPage from "./views/landingPage/landingPage.jsx";
import Favorites from "./views/favorites/favorites";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const EMAIL = "amder@gmail.com";
  const PASSWORD = "1password";

  function login(userData) {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
      navigate("/home");
    }
  }
  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  function SearchHandler(id) {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
  }

  function closeHandler(id) {
    let deleted = characters.filter((character) => character.id !== Number(id));
    //aqui se puede agregar el removeFavorite con react-redux. Pero mejor esperar los hooks
    dispatch(removeFavorite(id));

    setCharacters(deleted);
  }

  function randomHandler() {
    let haveIt = [];
    let random = (Math.random() * 826).toFixed(); //generamos un numero random

    random = Number(random);

    if (!haveIt.includes(random)) {
      haveIt.push(random);
      fetch(`https://rickandmortyapi.com/api/character/${random}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert("No hay Personajes con ese ID");
          }
        });
    } else {
      console.log("Ya agregaste todos los personajes");
      return false;
    }
  }

  return (
    <div className="App">
      <img className="title" src={logoRM} alt="logoRM" />
      {location.pathname !== "/" && (
        <NavBar onSearch={SearchHandler} random={randomHandler} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage login={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
