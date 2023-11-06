const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (op, x, y) => op(x, y);

const displayBottom = document.querySelector(".bottom-row");
const displayTop = document.querySelector(".top-row");
const allNums = document.querySelectorAll(".number");
const allOperators = document.querySelectorAll(".operator");

let currentBottomDisplay = 0;
let currentTopDisplay = displayTop.textContent;

const updateDisplay = (number) => {
  if (currentBottomDisplay === 0) {
    displayBottom.textContent = number;
  }
  if (currentBottomDisplay !== 0 && currentBottomDisplay.length !== 13) {
    displayBottom.textContent += number;
  }
  if (currentBottomDisplay.length === 13) {
    displayBottom.textContent = displayBottom.textContent.slice(0, -1);
    displayBottom.textContent += number;
  }
  currentBottomDisplay = displayBottom.textContent;
};

document.addEventListener("DOMContentLoaded", () => {
  allNums.forEach((node) => {
    node.addEventListener("click", () => updateDisplay(node.textContent));
  });

  allOperators.forEach((node) =>
    node.addEventListener(
      "click",
      () =>
        (displayTop.textContent =
          displayBottom.textContent + " " + node.textContent)
    )
  );
});

let clearButton = document.querySelector("#Clear");
clearButton.addEventListener("click", () => {
  displayBottom.textContent = 0;
  displayTop.textContent = "";
  currentBottomDisplay = 0;
});
