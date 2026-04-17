const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');
const operation = document.querySelector('#result h1')

const btnDel = document.querySelector('.del');
const btnReset = document.querySelector('.reset');
const btnEqual = document.querySelector('.result');

let expression = [];
let current = "";
let justCalculed = false;

function updateScreen() {
    let text = expression.join(" ");
    operation.textContent = text + " " + current || "0";
}

function inputNumber(value) {
    if (justCalculed) {
        expression = [];
        current = "";
        justCalculed = false;
    }

    if (value === "." && current.includes(".")) return;

    current += value;
    updateScreen();
}

function inputOperator(op) {
    if (current === "" && expression.length > 0) {
        expression[expression.length - 1] = op;
        updateScreen();
        return
    }

    if (current === "") return;

    expression.push(current);
    expression.push(op);

    current = "";
    updateScreen();
}

numbers.forEach(btn => {
    btn.addEventListener('click', () => {
        inputNumber(btn.textContent);
        btn.blur();
    })
})

operators.forEach(btn => {
    btn.addEventListener('click', () => {
        inputOperator(btn.textContent);
        btn.blur();
    })
})

//Functions (Calculate, Delete, Reset)
function calculate() {
    if (current !== ""){
        expression.push(current);
    }

    if (expression.length < 3) {
        return current || "0";
    }

    let exp = [...expression];

    for (let i = 0; i < exp.length; i++) {
        if(exp[i] === "x" || exp[i] === "/") {
            let a = parseFloat(exp[i - 1]);
            let b = parseFloat(exp[i + 1]);
            let resp;

            if(exp[i] === "x") {
                resp = a * b;
            } else {
                resp = a / b;
            }

            exp.splice(i - 1, 3, resp.toString());
            i -= 1;
        }
    }

    let resp = parseFloat(exp[0]);

    for (let i = 1; i < exp.length; i += 2) {
        let operator = exp[i];
        let value = parseFloat(exp[i+1]);

        if (operator === "+") {
            resp += value;
        } else {
            resp -=value;
        }

    }

    expression = [];
    current = resp.toString();
    
    return resp;
};

function del() {
    if (current !== "") {
        current = current.slice(0, -1);
    } else {
        expression.pop();
    }

    updateScreen();
};

function reset() {
    expression = [];
    current = "";
    updateScreen();
};

btnDel.addEventListener('click', () => {
    del();
})

btnReset.addEventListener('click', () => {
    reset();
})

btnEqual.addEventListener('click', () => {
    let res = calculate();
    operation.textContent = res;
    justCalculed = true;
})

// KEYBOARD INPUT
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.blur();
    }

    const key = e.key;

    // Numbers
    if (/^[0-9]$/.test(key)) {
        inputNumber(key);
    } 
    
    else if (key === ".") {
        inputNumber(".");
    } 
    
    else if (["+", "-", "*", "/"].includes(key)) {
        let op = key === "*" ? "x" : key;
        inputOperator(op);
    } 
    
    else if (key === "Enter") {
        let res = calculate();
        operation.textContent = res;
        justCalculed = true;
    } 
    
    else if (key === "Backspace") {
        del();
    } 
    
    else if (key === "Escape") {
        reset();
    }
})