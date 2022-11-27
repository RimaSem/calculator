let previousValue = "";
let currentValue = "";
let operator = "";

let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");

let previousDisplay = document.querySelector(".previous");
let currentDisplay = document.querySelector(".current");

clear.addEventListener("click", () => {
  previousValue = "";
  currentValue = "";
  operator = "";
  previousDisplay.textContent = "";
  currentDisplay.textContent = "";
});

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    if (currentValue.length <= 5) {
      currentValue += e.target.textContent;
    }
    currentDisplay.textContent = currentValue;
  })
);

operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    operator = e.target.textContent;
    previousValue = currentValue;
    currentValue = "";
    previousDisplay.textContent = previousValue + " " + operator;
    currentDisplay.textContent = currentValue;
  })
);

equal.addEventListener("click", (e) => {
  if (previousValue != "" && currentValue != "") {
    result = operate(operator, previousValue, currentValue);
    previousDisplay.textContent = "";
    if (previousValue.length <= 5) {
      currentDisplay.textContent = previousValue;
    } else {
      currentDisplay.textContent = previousValue.slice(0, 5) + "...";
    }
  }
});

decimal.addEventListener("click", () => {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, a, b) {
  a = +a;
  b = +b;
  switch (op) {
    case "+":
      previousValue = add(a, b);
      break;
    case "-":
      previousValue = subtract(a, b);
      break;
    case "*":
      previousValue = multiply(a, b);
      break;
    case "/":
      previousValue = divide(a, b);
      break;
    default:
      return "ERROR";
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}
