const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Nope! 0'a bölünemez" : a / b);

function operate(operator, a , b) {
    a = Number(a);
    b = Number(b);
    let result;
    if (operator === "+") result = add(a, b);
    if (operator === "-") result = subtract(a, b);
    if (operator === "*") result = multiply(a, b);
    if (operator === "/") result = divide(a, b);

    if (typeof result === "number") {
        return Math.round(result * 10000) / 10000;
    }
    return result;
}

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (display.textContent === "0" || shouldResetDisplay) {
            display.textContent = button.textContent;
            shouldResetDisplay = false;
        } else {
            display.textContent += button.textContent;
        }
    });
});


operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        
        if (currentOperator !== null && !shouldResetDisplay) {
            secondNumber = display.textContent;
            const result = operate(currentOperator, firstNumber, secondNumber);
            display.textContent = result;
            firstNumber = result;
        } else {
            firstNumber = display.textContent;
        }
        currentOperator = button.dataset.op;
        shouldResetDisplay = true; // Yeni sayı yazılırken ekran temizlensin
    });
});

equalsButton.addEventListener("click", () => {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;
    display.textContent = operate(currentOperator, firstNumber, secondNumber);
    currentOperator = null;
    shouldResetDisplay = true;
});

clearButton.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;
});