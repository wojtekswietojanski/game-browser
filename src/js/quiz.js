import fetchData from "./API.js";
import React, { useState, useEffect } from "react";
import "../styling/Quiz/quiz.css";

const Quiz = () => {
  // labels --> container for labels
  const [labels, setLabels] = useState(["", "", "", ""]);
  // randomIndexContainer --> container for randomIndex
  const [randomIndexContainer, setRandomIndexContainer] = useState(0);
  // green/red/black colors of labels
  var labelsColor = document.querySelectorAll("label");

  // fetchowanie danych
  async function createQuiz() {
    try {
      var responseContainer = await fetchData("");
      var randomObject =
        responseContainer.results[Math.floor(Math.random() * 21)];
      console.log(randomObject);
      var quizFoto = document.getElementById("quizFoto");
      quizFoto.style.backgroundImage =
        "url(" + randomObject.background_image + ")";
      var labelsContainer = ["", "", "", ""];
      var randomIndex = Math.floor(Math.random() * labelsContainer.length);
      setRandomIndexContainer(randomIndex);
      labelsContainer[randomIndex] = randomObject.name;
      for (var i = 0; i < labelsContainer.length; i++) {
        if (i != randomIndex) {
          labelsContainer[i] =
            responseContainer.results[Math.floor(Math.random() * 21)].name;
        }
      }
      setLabels(labelsContainer);
    } catch (error) {
      console.error(
        "wystąpił błąd przy renderowaniu zdjęć/odpowiedzi gier" + error
      );
    }
  }

  const checkAnswer = () => {
    var inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.checked) {
        var inputIndex = input.value.slice(-1);
        if (inputIndex == randomIndexContainer) {
          window.alert("Dobrze!");
        } else {
          console.log(labelsColor[inputIndex]);
          window.alert("Źle!");
        }
      }
    });
    setTimeout(() => {
      createQuiz();
    }, 1000);
  };

  useEffect(() => {
    console.log("useEffect");
    createQuiz();
  }, []);

  return (
    <section id="quizSection">
      <div id="quizFoto"></div>
      <div id="formContainer">
        <div>
          <input type="radio" name="option" value="option0" />
          <label>{labels[0]}</label>
        </div>

        <div>
          <input type="radio" name="option" value="option1" />
          <label>{labels[1]}</label>
        </div>

        <div>
          <input type="radio" name="option" value="option2" />
          <label>{labels[2]}</label>
        </div>

        <div>
          <input type="radio" name="option" value="option3" />
          <label>{labels[3]}</label>
        </div>

        <button id="submitAnswer" onClick={checkAnswer}>
          zatwierdź
        </button>
      </div>
    </section>
  );
};

export default Quiz;
