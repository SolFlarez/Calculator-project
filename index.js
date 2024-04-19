const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const operatorArray = ["+", "-", "÷", "x"];

const calculate = (op, x, y) => {
  let result = 0;
  console.log(op, x, y);
  switch (op) {
    case "+":
      result = add(x, y);
      break;
    case "-":
      result = subtract(x, y);
      break;
    case "x":
      result = multiply(x, y);
      break;
    case "÷":
      result = divide(x, y);
      break;
  }
  if (result.toString().length > 5) {
    return result.toFixed(5);
  }
  return result;
};

const displayBottom = document.querySelector(".bottom-row");
const displayTop = document.querySelector(".top-row");
const allNums = document.querySelectorAll(".number");
const allOperators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#Equals");
const decimalButton = document.querySelector("#Decimal");
const clearButton = document.querySelector("#Clear");
const deleteButton = document.querySelector("#Delete");

let currentBottomDisplay = "0";
let currentTopDisplay = displayTop.textContent;
let expressionInProgress = false;

const updateDisplay = (character) => {
  console.log(character);
  if (expressionInProgress) {
    console.log("here2");
    const lastChar = displayTop.textContent.slice(-1);
    displayTop.textContent =
      displayTop.textContent +
      `${operatorArray.includes(lastChar) ? " " : ""}` +
      character;
  } else if (currentBottomDisplay === "0") {
    console.log("here");
    displayBottom.textContent = character;
  } else if (
    currentBottomDisplay !== "0" &&
    currentBottomDisplay.length !== 13
  ) {
    displayBottom.textContent += character;
  }

  if (currentBottomDisplay.length === 13) {
    displayBottom.textContent = displayBottom.textContent.slice(0, -1);
    displayBottom.textContent += character;
  }
  if (isValidExpression()) {
    evaluateTopExpression();
  }
  currentBottomDisplay = displayBottom.textContent;
};

document.addEventListener("DOMContentLoaded", () => {
  allNums.forEach((node) => {
    node.addEventListener("click", () => updateDisplay(node.textContent));
  });

  allOperators.forEach((node) =>
    node.addEventListener("click", () => {
      if (displayTop.textContent !== "" || displayBottom.textContent !== "") {
        displayTop.textContent =
          displayBottom.textContent + " " + node.textContent;
        displayBottom.textContent = "";
        expressionInProgress = true;
      }
    })
  );
});

const isValidExpression = () => {
  let expression = displayTop.textContent.split(" ");
  if (expression.length !== 3) {
    return false;
  } else if (expression[1] === "÷" && expression[2] === "0") {
    return false;
  } else {
    return true;
  }
};

const evaluateTopExpression = () => {
  let expression = displayTop.textContent.split(" ");
  let result = calculate(
    expression[1],
    Number(expression[0]),
    Number(expression[2])
  );
  displayBottom.textContent = result;
  console.log(result);
};

equalsButton.addEventListener("click", () => {
  if (isValidExpression()) {
    evaluateTopExpression();
  }
});

clearButton.addEventListener("click", () => {
  displayBottom.textContent = 0;
  displayTop.textContent = "";
  currentBottomDisplay = "0";
  expressionInProgress = false;
});

decimalButton.addEventListener("click", () => {
  updateDisplay(decimalButton.textContent);
});

deleteButton.addEventListener("click", () => {
  if (expressionInProgress) {
    displayTop.textContent = displayTop.textContent.slice(0, -1);
    evaluateTopExpression();
    console.log("deleteEvent");
  } else {
    displayBottom.textContent = displayBottom.textContent.slice(0, -1);
  }
  if (displayBottom.textContent.length === 1) {
    displayBottom.textContent = "0";
    currentBottomDisplay = "0";
  }
});
