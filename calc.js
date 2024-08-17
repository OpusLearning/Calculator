const gridContainer = document.querySelector(".calcWrapper");
const displayContainer = document.querySelector(".displayScreen");
const displayCalcContainer = document.querySelector(".calcScreen");
const keySound = new Audio("click.mp3");
let calcValue1 = 0;
let calcValue2 = null;
let displayValue = "0";
let displayCalcValue = "";
let operand = "";
let isNewOperand = false;

function createGrid() {
  const keyArray = [
    "C",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  for (let i = 0; i < keyArray.length; i++) {
    const child = document.createElement("div");
    child.id = `key${i}`;
    if (keyArray[i] === "0") {
      child.className = "keyClassWide";
    } else {
      child.className = "keyClass";
    }
    if (["C", "+/-", "%"].includes(keyArray[i])) {
      child.style.background = "#0000CD";
      child.dataset.press = "#6495ED";
      child.dataset.return = "#0000CD";
    } else if (["/", "*", "-", "+", "="].includes(keyArray[i])) {
      child.style.background = "#00CED1";
      child.dataset.press = "#AFEEEE";
      child.dataset.return = "#00CED1";
    } else {
      child.style.background = "Orange";
      child.dataset.press = "#FFE4C4";
      child.dataset.return = "Orange";
    }
    child.textContent = `${keyArray[i]}`;
    child.addEventListener("click", function () {
      const originalColor = child.style.background;
      child.style.background = child.dataset.press;

      setTimeout(() => {
        child.style.background = originalColor;
      }, 100);
      keySound.currentTime = 0;
      keySound.play();
      handleInput(keyArray[i]);
    });
    gridContainer.appendChild(child);
  }
  updateDisplay("0");
  updateCalcDisplay("0");
}
nd = false;

function handleInput(key) {
  if (key === "C") {
    displayValue = "0";
    displayCalcValue = "";
    calcValue1 = 0;
    calcValue2 = null;
    operand = "";
    isNewOperand = false;
  } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(key)) {
    if (displayValue === "0" || isNewOperand) {
      displayValue = key;
      isNewOperand = false;
    } else {
      if (displayValue.length < 8) {
        displayValue += key;
      }
    }
  } else if (key === ".") {
    if (!displayValue.includes(".")) {
      displayValue += key;
    }
  } else if (key === "+/-") {
    if (displayValue !== "0") {
      displayValue = displayValue.startsWith("-")
        ? displayValue.substring(1)
        : "-" + displayValue;
    }
  } else if (key === "%") {
    if (displayValue !== "0") {
      displayValue = (Number(displayValue) / 100).toString();
    }
  } else if (["+", "-", "/", "*"].includes(key)) {
    if (calcValue2 !== null) {
      calcValue1 = performOperation(calcValue1, calcValue2, operand);
      displayValue = calcValue1.toFixed(2);
      calcValue2 = null;
    } else {
      calcValue1 = Number(displayValue);
    }
    operand = key;
    displayCalcValue = `${calcValue1} ${operand}`;
    isNewOperand = true;
  } else if (key === "=") {
    if (calcValue2 === null) {
      calcValue2 = Number(displayValue);
    }
    if (operand) {
      let result = performOperation(calcValue1, calcValue2, operand);
      displayValue = result.toFixed(2);
      displayCalcValue = `${calcValue1} ${operand} ${calcValue2} =`;
      calcValue1 = result;
      calcValue2 = null;
      operand = "";
      isNewOperand = true;
    }
  }

  updateCalcDisplay(displayCalcValue);
  updateDisplay(displayValue);
}

function performOperation(value1, value2, operator) {
  switch (operator) {
    case "+":
      return add(value1, value2);
    case "-":
      return subtract(value1, value2);
    case "*":
      return mult(value1, value2);
    case "/":
      return divide(value1, value2);
    default:
      return value1;
  }
}

function updateDisplay(input) {
  displayContainer.textContent = input;
}

function updateCalcDisplay(input) {
  displayCalcContainer.textContent = input;
}

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const mult = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  if (b === 0) {
    return "Erm nope / 0";
  }
  return a / b;
};

createGrid();
