const title = document.querySelector("h1");
const btnReinintialize = document.querySelector(".fa-undo");
const cardsContainer = document.querySelector("ul");
const exerciceContainer = document.querySelector(".exercice-container");
const btnStart = document.getElementById("start");
const btnReboot = document.querySelector(".btn-reboot");

// console.log(btnReboot);
exerciceContainer.style.display = "none";
btnReboot.style.display = "none";
let totalSeconds;
let interval;
let exercises = [];
let currentIndex = 0;
const texteInitial = title.innerHTML;
const btnStartTexteInitial = btnStart.textContent;
// console.log(btnStartTexteInitial);

const position = {
  position0: "./img/0.png",
  position1: "./img/1.png",
  position2: "./img/2.png",
  position3: "./img/3.png",
  position4: "./img/4.png",
  position5: "./img/5.png",
  position6: "./img/6.png",
  position7: "./img/7.png",
  position8: "./img/8.png",
  position9: "./img/9.png",
};

//--------------------------------------------------------------------------
// FONCTIONS
//--------------------------------------------------------------------------

//--------------
// DISPLAY CARDS
//--------------
const displayCards = () => {
  cardsContainer.innerHTML = "";
  const storedCards = JSON.parse(localStorage.getItem("cards"));
  const cardsToDisplay =
    storedCards ||
    Object.values(position).map((img) => ({ imgSrc: img, minValue: "1" }));

  cardsToDisplay.forEach(({ imgSrc, minValue }) => {
    cardsContainer.innerHTML += `
      <li>
        <div class="card-header">
          <input type="number" value="${minValue}">
          <span>min</span>
        </div>
        <img src="${imgSrc}" alt="">
        <i class="fa-solid fa-circle-arrow-left arrow"></i>
        <i class="fa-solid fa-circle-xmark deleteBtn"></i>
      </li>
    `;
  });
  const arrow = document.querySelectorAll(".arrow");
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const inputs = document.querySelectorAll("input");
  // console.log(inputs);

  inputs.forEach((input) =>
    input.addEventListener("input", () => {
      saveCardsToLocalStorage();
    })
  );

  arrow.forEach((arrowIcon) =>
    arrowIcon.addEventListener("click", () => {
      const li = arrowIcon.parentNode;
      const prevLi = li.previousElementSibling;
      if (prevLi) {
        li.parentNode.insertBefore(li, prevLi);
        saveCardsToLocalStorage();
      }
    })
  );

  deleteBtn.forEach((deleteIcon) =>
    deleteIcon.addEventListener("click", () => {
      // console.log(deleteIcon.parentNode);
      deleteIcon.parentNode.remove();
      saveCardsToLocalStorage();
    })
  );
};

// displayCards();

//---------------------------
// SAVE CARDS TO LOCALSTORAGE
//---------------------------
const saveCardsToLocalStorage = () => {
  const cards = document.querySelectorAll("li");
  const cardData = [];

  cards.forEach((card) => {
    const imgSrc = card.querySelector("img").getAttribute("src").trim();
    const minValue = card.querySelector("input").value;
    cardData.push({ imgSrc, minValue });
  });

  localStorage.setItem("cards", JSON.stringify(cardData));
};

//-----------------
// EXERCICE DISPLAY
//-----------------

const countdown = (element) => {
  // const minutes = Math.floor(timerValue / 60);
  const timerDisplay = element.querySelector("p");
  interval = setInterval(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const sec = seconds < 10 ? "0" + seconds : seconds;
    const min = minutes < 10 ? "0" + minutes : minutes;

    timerDisplay.textContent = `${min}:${sec}`;

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      // timerDisplay.textContent = "C'est terminé !";
      if (interval) clearInterval(interval);
      currentIndex++;
      if (currentIndex < exercises.length) {
        startExercise(currentIndex);
        ring();
      } else {
        title.textContent = "C'est terminée !";
        exerciceContainer.style.display = "none";
        btnStart.textContent = "Recommencer";
        btnStart.style.display = "inline";
        btnReboot.style.display = "inline";
      }
    }
  }, 100);
};
const exerciceDiplay = (timer, imgSrc, length) => {
  cardsContainer.style.display = "none";
  btnStart.style.display = "none";
  exerciceContainer.style.display = "block";
  title.textContent = "Routine";
  exerciceContainer.innerHTML = `
      <p></p>
      <img src="${imgSrc}">
      <div>${currentIndex + 1}/${length}</div>
    `;
  // totalSeconds = timer * 60;
  // countdown(exerciceContainer);
};
// exerciceDiplay();

//----------------
// START EXERCICES
//----------------
const startExercise = (index) => {
  const { timer, img } = exercises[index];
  totalSeconds = timer * 60;
  exerciceDiplay(timer, img, exercises.length);
  countdown(exerciceContainer);
};

//-----
// RING
//-----
const ring = () => {
  const audio = new Audio("./ring.mp3");
  audio.play();
};

//--------------------------------------------------------------------------
// EVENTS
//--------------------------------------------------------------------------

window.addEventListener("load", () => {
  btnReinintialize.style.display = "inline";
  displayCards();
});

btnReinintialize.addEventListener("click", () => {
  localStorage.removeItem("cards");
  displayCards();
});

btnStart.addEventListener("click", () => {
  btnReboot.style.display = "none";
  const cards = [...document.querySelectorAll("li")];
  exercises = cards.map((card) => ({
    timer: parseInt(card.querySelector("input").value, 10),
    img: card.querySelector("img").src,
  }));
  currentIndex = 0;
  startExercise(currentIndex);
});

btnReboot.addEventListener("click", () => {
  btnReboot.style.display = "none";
  btnReinintialize.style.display = "inline";
  title.innerHTML = texteInitial;
  btnStart.textContent = btnStartTexteInitial;
  localStorage.removeItem("cards");
  cardsContainer.style.display = "flex";
  displayCards();
  // console.log(
  //   "btnReinintialize display:",
  //   getComputedStyle(btnReinintialize).display
  // );
});
