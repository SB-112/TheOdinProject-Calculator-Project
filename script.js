// DOM Elements
const clearBtn = document.getElementById("clear-btn");
const deleteBtn = document.getElementById("delete-btn");
const equalBtn = document.getElementById("equals-btn");
const dotBtn = document.getElementById("dot-btn");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");

let firstNumber = '';
let operator = null;
let shouldResetDisplay = false;

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        if(shouldResetDisplay) {
            currentDisplay.textContent = "";
            shouldResetDisplay = false;
        }
        currentDisplay.textContent += button.textContent;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentDisplay.textContent === "") return;

        if (operator !== null) {
            evaluate();
        }

        firstNumber = currentDisplay.textContent;
        operator = button.textContent;
        previousDisplay.textContent = `${firstNumber} ${operator}`;
        shouldResetDisplay = true;
    });
});


const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {
    if(b == 0) return "Nah you can't do that";
    return a / b;   
}

function operate(op, a, b){
    a =Number(a);
    b = Number(b);

    switch(op){
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        default: return null;
    }
}

equalBtn.addEventListener("click", evaluate);

function evaluate() {
    if (operator === null || shouldResetDisplay) return;

    const secondNumber = currentDisplay.textContent;
    let result = operate(operator, firstNumber, secondNumber);

    if (typeof result === "number") {
        result = Math.round(result * 1000) / 1000;
    }

    currentDisplay.textContent = result;
    previousDisplay.textContent = "";

    operator = null;
    firstNumber = result;
    shouldResetDisplay = true;
}

clearBtn.addEventListener("click", () => {
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
    firstNumber = "";
    operator = null;
});

dotBtn.addEventListener("click", () => {
    // Prevent adding a second decimal
    if (currentDisplay.textContent.includes(".")) return;

    // If display is empty, start with 0.
    if (currentDisplay.textContent === "" || shouldResetDisplay) {
        currentDisplay.textContent = "0.";
        shouldResetDisplay = false;
    } else {
        currentDisplay.textContent += ".";
    }
});

deleteBtn.addEventListener('click', () => {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
});
