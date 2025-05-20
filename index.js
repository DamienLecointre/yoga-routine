const cardsContainer = document.querySelector("ul");

// console.log(arrow, deleteBtn);

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

const displayCards = () => {
  cardsContainer.innerHTML = "";
  for (keys in position) {
    // console.log(position[keys]);
    cardsContainer.innerHTML += `
      <li>
        <div class="card-header">
          <input type="number" name="" id="" value="1">
          <span>min</span>
        </div>
        <img src="${position[keys]} " alt="">
        <i class="fa-solid fa-circle-arrow-left arrow"></i>
        <i class="fa-solid fa-circle-xmark deleteBtn"></i>
      </li>
    `;
  }
  const arrow = document.querySelectorAll(".arrow");
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const card = document.querySelectorAll("li");
  console.log(card);

  arrow.forEach((arrowIcon) =>
    arrowIcon.addEventListener("click", (e) => {
      console.log(e.target);
    })
  );

  deleteBtn.forEach((deleteIcon) =>
    deleteIcon.addEventListener("click", () => {
      // console.log(deleteIcon.parentNode);
      deleteIcon.parentNode.remove();
    })
  );

  // console.log(typeof cardsContainer);
};

// displayCards();

window.addEventListener("load", displayCards);

// const arrow = document.querySelectorAll(".arrow");
// const deleteBtn = document.querySelectorAll(".deleteBtn");
// const card = document.querySelectorAll("li");
// console.log(card);

// arrow.forEach((arrowIcon) =>
//   arrowIcon.addEventListener("click", () => {
//     console.log(arrowIcon.parentNode);
//   })
// );

// deleteBtn.forEach((deleteIcon) =>
//   deleteIcon.addEventListener("click", () => {
//     // console.log(deleteIcon.parentNode);
//     deleteIcon.parentNode.remove();
//   })
// );
