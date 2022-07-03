let currentNum = '';
let previousNum = '';
let operator = '';

const addition = document.querySelector('.add-operations');
const subtraction = document.querySelector('.subtract-operations');
const multiplication = document.querySelector('.multiply-operations');
const division = document.querySelector('.divide-operations');
const currentDisplayNumber = document.querySelector(".cur-result");
const previousDisplayNumber = document.querySelector(".prev-result");
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    operate();
  }
})

clear.addEventListener("click", clearCalculator);

numberButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op)
  } else if (currentNum === "") {
    operatorCheck(op)
  } else {
    operate();
    operator = op;
    currentDisplayNumber.textContent = "";
    previousDisplayNumber.textContent = previousNum + operator + currentDisplayNumber.textContent;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + operator;
  currentDisplayNumber.textContent = "";
  currentNum = "";
}

function operate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum)

  if (operator === "+") {
    previousNum += currentNum;
  }
  else if (operator === "−") {
    previousNum -= currentNum;
  }
  else if (operator === "×") {
    previousNum *= currentNum;
  }
  else if (operator === "÷") {
    if (currentNum <= 0) {
      previousNum = 'Undefined';
      displayResults();
      return;
    } 
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (previousNum.length <= 11) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0,-1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0,-1);
    currentDisplayNumber.textContent = previousNum;
  }
}

backspace.addEventListener("click", handleDelete);
