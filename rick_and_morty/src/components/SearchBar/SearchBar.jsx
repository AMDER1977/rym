import { useState } from "react";
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  SearchIconContainer,
} from "./searchBar.style.js";

export default function SearchBar(props) {
  const { onSearch } = props;

  const [id, setId] = useState("");

  function chageHandler(e) {
    e.preventDefault(); // usar en barras de busqueda
    let input = e.target.value;
    setId(input);
  }

  return (
    <SearchContainer>
      <SearchInput type="search" value={id} onChange={chageHandler} />
      <SearchIconContainer>
        <SearchIcon onClick={() => onSearch(id)} />
      </SearchIconContainer>
    </SearchContainer>
  );
}
