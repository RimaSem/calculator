let previousValue = "";
let currentValue = "";
let operator = "";
let usedEqual = false;

let clear = document.querySelector(".clear");
let back = document.querySelector(".back");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");
let negative = document.querySelector(".negative");
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
  usedEqual = false;
});

back.addEventListener("click", () => {
  if (
    (!previousValue && currentDisplay.textContent.length <= 1) ||
    (previousValue && usedEqual)
  ) {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousDisplay.textContent = "";
    currentDisplay.textContent = "";
    usedEqual = false;
  } else if (!previousValue || !usedEqual) {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    currentValue = currentDisplay.textContent;
  }
});

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    if (!usedEqual) {
      if (currentValue.length <= 5) {
        currentValue += e.target.textContent;
      }
      currentDisplay.textContent = currentValue;
    }
  })
);

operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    if (usedEqual) {
      usedEqual = false;
      operator = e.target.textContent;
      previousDisplay.textContent = previousValue + " " + operator;
      currentValue = "";
    } else if (currentValue && previousValue) {
      operate(operator, previousValue, currentValue);
      operator = e.target.textContent;
      previousDisplay.textContent = previousValue + " " + operator;
      currentValue = "";
    } else if (currentValue) {
      operator = e.target.textContent;
      previousDisplay.textContent = currentValue + " " + operator;
      previousValue = currentValue;
      currentValue = "";
    }
  })
);

equal.addEventListener("click", (e) => {
  if (previousValue != "" && currentValue != "") {
    usedEqual = true;
    operate(operator, previousValue, currentValue);
    currentValue = "";
    operator = "";
    if (previousValue.length <= 9) {
      previousDisplay.textContent = "";
      currentDisplay.textContent = previousValue;
    } else {
      previousDisplay.textContent = "";
      currentDisplay.textContent = previousValue.slice(0, 10) + "...";
    }
  }
});

decimal.addEventListener("click", () => {
  if (!usedEqual) {
    if (!currentValue.includes(".")) {
      if (currentValue.length < 1) {
        currentValue += "0.";
        currentDisplay.textContent = currentValue;
      } else {
        currentValue += ".";
        currentDisplay.textContent += ".";
      }
    }
  }
});

negative.addEventListener("click", () => {
  if (!usedEqual) {
    if (currentDisplay.textContent.startsWith("-")) {
      currentDisplay.textContent = currentDisplay.textContent.slice(1);
    } else {
      currentDisplay.textContent = "-" + currentDisplay.textContent;
    }
    currentValue = currentDisplay.textContent;
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

function remainder(a, b) {
  return a % b;
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
    case "%":
      previousValue = remainder(a, b);
      break;
    default:
      return "ERROR";
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  //currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}
