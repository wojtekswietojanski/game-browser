import fetchData from "./API.js";
import React, { useState, useEffect } from "react";
import "../styling/Home/home.css";

const Home = () => {
  // responseObject --> object that contains data fetched from RAWG databese API
  const [responseObject, setResponseObject] = useState({});
  // searchText --> phrase that user wants to search
  const [searchText, setSearchText] = useState("");
  // filters --> user filters
  const [filters, setFilters] = useState("");
  // tags --> user tags
  const [tags, setTags] = useState("");
  // ordering --> user ordering
  const [ordering, setOrdering] = useState("");
  // additions --> excluding or including DLC
  const [additions, setAdditions] = useState("");
  // isShown --> showing additional info
  const [isShown, setIsShown] = useState(0);

  // fetchowanie danych
  async function createGallery(filter) {
    try {
      var responseContainer = await fetchData(filter);
      setResponseObject(responseContainer);
    } catch (error) {
      console.error("wystąpił błąd przy renderowaniu galerii gier" + error);
    }
  }

  // handling search
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      const hasSearchFilter = filters.includes("&search");

      if (hasSearchFilter) {
        const updatedFilters = filters.replace(/&search[^&]*/, "");
        setFilters(updatedFilters + `&search=${searchText}`);
      } else {
        setFilters(filters + `&search=${searchText}`);
      }
    }
  };

  // handling filter button
  const handleFilters = () => {
    let filterSection = document.getElementById("filters");
    filterSection.classList.toggle("filtersActive");
  };

  // handling sorting by user
  const handleSortByReviews = () => {
    setOrdering("&ordering=-metacritic");
  };
  const handleSortByDate = () => {
    setOrdering("&ordering=-relased");
  };
  const handleExcludeDLC = () => {
    setAdditions("&exclude_additions=1");
  };

  //handling adding tags by user
  const handleTag = (tagName) => {
    setTags("&tags=" + tagName);
  };

  //handling reseting filter by user
  const handleReset = () => {
    setTags("");
    setFilters("");
    setOrdering("");
    setAdditions("");
  };

  //calling createGalery when filters change and after page is loaded
  useEffect(() => {
    var filtersAndOrderingAndTags = filters + ordering + additions + tags;
    createGallery(filtersAndOrderingAndTags);
  }, [filters, ordering, additions, tags]);

  return (
    <section id="gamesGallery">
      <div id="searchAndFilters">
        <input
          type="text"
          placeholder="search and press enter"
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
          spellCheck="false"
        />
        <button onClick={handleFilters}>Filters↓</button>
      </div>
      <section id="filters">
        <div id="sortFilters">
          <button onClick={handleSortByReviews}>Sort by reviews</button>
          <button onClick={handleSortByDate}>Sort by realese date</button>
          <button onClick={handleExcludeDLC}>Exclude DLCs</button>
          <button onClick={handleReset}>RESET</button>
        </div>
        <div id="Tags">
          <button onClick={() => handleTag("singleplayer")}>
            singleplayer
          </button>
          <button onClick={() => handleTag("steam-achievements")}>
            steam-achievements
          </button>
          <button onClick={() => handleTag("multiplayer")}>multiplayer</button>
          <button onClick={() => handleTag("atmospheric")}>atmospheric</button>
          <button onClick={() => handleTag("rpg")}>rpg</button>
          <button onClick={() => handleTag("co-op")}>co-op</button>
          <button onClick={() => handleTag("great-soundtrack")}>
            great-soundtrack
          </button>
          <button onClick={() => handleTag("third-person")}>
            third-person
          </button>
          <button onClick={() => handleTag("first-person")}>
            first-person
          </button>
        </div>
      </section>
      {responseObject.results &&
        responseObject.results.map((attribute) => (
          <div
            key={attribute.id}
            id={attribute.id}
            className="galleryObjectContainer"
            onMouseEnter={() => setIsShown(attribute.id)}
            onMouseLeave={() => setIsShown(0)}
          >
            <div
              className="galleryObject"
              style={{
                backgroundImage: `url(${attribute.background_image})`,
                backgroundColor: "black",
              }}
            ></div>
            <div className="galleryObjectInfo">{attribute.name}</div>
            {attribute.id == isShown && (
              <div className="hoverInfo">
                <p>
                  Genres:{" "}
                  {attribute.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>Metacritic score: {attribute.metacritic}</p>
                <p>Released: {attribute.released}</p>
                <p>
                  Platforms:{" "}
                  {attribute.platforms
                    .map((platformData) => platformData.platform.name)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>
        ))}
    </section>
  );
};

export default Home;
