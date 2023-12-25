import React, { useState } from "react";
import "./Search.css";

const Search = ({ setData, setChecker }) => {
  const [city, setCity] = useState("");

  const APIKey = "5d45b130b711389d1b3a27526206a85e";

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleApiCall = async (e) => {
    e.preventDefault();
    if (city === "") {
      setChecker(false);
    } else {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
      );
      const data = await response.json();
      setData(data);
      setChecker(true);
    }
  };
  return (
    <>
      <form onSubmit={handleApiCall} className="searchForm">
        <i className="fa-solid fa-location-dot"></i>
        <input type="text" placeholder="Search..." onChange={handleCity} />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </>
  );
};

export default Search;
