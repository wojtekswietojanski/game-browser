import fetchData from "./API.js";
import React, { useState, useEffect } from "react";
import "../styling/Home/home.css";

const Home = () => {
  // responseObject --> object that contains data fetched from RAWG databese API
  const [responseObject, setResponseObject] = useState({});

  // funkcjs
  async function createGallery(filter) {
    try {
      var responseContainer = await fetchData("");
      setResponseObject(responseContainer);
      console.log(responseContainer.results);
    } catch (error) {
      console.error("wystąpił błąd przy renderowaniu galerii gier" + error);
    }
  }

  // calling createGallery after rendering page
  useEffect(() => {
    createGallery();
  }, []);

  return (
    <section id="gamesGallery">
      {responseObject.results &&
        responseObject.results.map((attribute) => (
          <div
            className="galleryObject"
            key={attribute.id}
            id={attribute.id}
            style={{ backgroundImage: `url(${attribute.background_image})` }}
          >
            {attribute.name}
          </div>
        ))}
    </section>
  );
};

export default Home;
