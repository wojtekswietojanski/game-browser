import "./App.css";
import Navbar from "./js/navbar";
import Home from "./js/home";
import React, { useState, useEffect } from "react";
import Quiz from "./js/quiz";

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = (index) => {
    if (index === 0 || index === 1) {
      setCurrentPage(index);
    }
  };
  return (
    <main>
      <Navbar changePage={changePage} />
      {currentPage == 0 && <Home />}
      {currentPage == 1 && <Quiz />}
    </main>
  );
}

export default App;
