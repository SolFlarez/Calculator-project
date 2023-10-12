const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

let firstNum = 0;
let secondNum = 0;
let operator = "";

const operate = (op, x, y) => op(x, y);

let displayBottom = document.querySelector(".bottom-row");
const allNums = document.querySelectorAll(".number");
let allOperators = document.querySelectorAll(".operator");
// update the displayBottom.textContent when a button with class number or
// operator is pressed

allNums.forEach((node) =>
  node.addEventListener(
    "click",
    () => (displayBottom.textContent += node.textContent)
  )
);
