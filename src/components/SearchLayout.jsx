import "../css/SearchLayout.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchLayout() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!city) return;
    navigate(`/search?q=${city}`);
    setCity("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da cidade"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button type="submit" id="btn_search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </>
  );
}

export default SearchLayout;
