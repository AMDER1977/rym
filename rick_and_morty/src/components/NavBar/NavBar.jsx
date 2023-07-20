import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./navBar.css";

export default function NavBar({ onSearch, random }) {
  return (
    <div className="navContainer">
      <div className="routContainer">
        <Link to="/about">About</Link>
      </div>
      <div className="routContainer">
        <Link to="/home">Home</Link>
      </div>
      <div className="routContainer">
        <Link to="/favorites">Favs</Link>
      </div>
      <div></div>
      <SearchBar onSearch={onSearch} />
      <button className="random" onClick={random}>
        ADD RANDOM
      </button>
    </div>
  );
}
