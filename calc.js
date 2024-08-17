const gridContainer = document.querySelector(".calcWrapper");
const displayContainer = document.querySelector(".displayScreen");
const keySound = new Audio("click.mp3");

let displayValue = "0";

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

      keySound.currentTime = 0; // Rewind to the start
      keySound.play(); // Play the sound

      handleInput(keyArray[i]);
    });

    gridContainer.appendChild(child);
  }
  updateDisplay("0");
}

function handleInput(key) {
  if (key === "C") {
    displayValue = "0";
  } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(key)) {
    if (displayValue === "0") {
      displayValue = key;
    } else {
      if (displayValue.length < 8) {
        displayValue += key;
      }
    }
  } else if (key === ".") {
    if (!displayValue.includes(".")) {
      displayValue += key;
    }
  }

  updateDisplay(displayValue);
}

function updateDisplay(input) {
  displayContainer.textContent = input;
}

createGrid();
