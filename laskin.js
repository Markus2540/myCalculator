'use strict';

import { btnNumber, btnSquareRoot, btnPower, btnFactorial, btnOpenParenthesis, 
    btnCloseParenthesis, btnPercentage, btnDivision, btnMultiplication, 
    btnAddition, btnSubtraction, btnDecimalPoint, btnErase, endsWithDecimalSeperator, 
    btnEquals, solveCalculation, eliminateParentheses} from './modules/calculatorFunctions.js';

const calculatorInputButtons = document.getElementById("calculatorinputbuttons");
const currentInputSpan = document.getElementById("currentinput");
const previewResult = document.getElementById("previewresult");
const numbers = /[0-9]/;
const operators = /[√\^!%÷\*\-\+]/;
const parenthesis = /[()]/;
let currentInput = "";

/*
Add event listener for every child element of calculatorInputButtons
*/ 
for (let i = 0; i < calculatorInputButtons.children.length; i++) {
    calculatorInputButtons.children[i].addEventListener('click', () => {
        inputLogic(calculatorInputButtons.children[i].textContent);
    });
}

/*
Add logic for manipulating currentInput and previewResult.
*/
function inputLogic(character) {
    switch (true) {
        case numbers.test(character):
            currentInput = btnNumber(character, currentInput);
            break;
        case operators.test(character) || parenthesis.test(character):
            if (currentInput.endsWith(".")) {
                currentInput = endsWithDecimalSeperator(currentInput);
            }
            if (character === "√") {
                currentInput = btnSquareRoot(currentInput);
            } else if (character === "^") {
                currentInput = btnPower(currentInput);
            } else if (character === "!") {
                currentInput = btnFactorial(currentInput);
            } else if (character === "(") {
                currentInput = btnOpenParenthesis(currentInput);
            } else if (character === ")") {
                currentInput = btnCloseParenthesis(currentInput);
            } else if (character === "%") {
                currentInput = btnPercentage(currentInput);
            } else if (character === "÷") {
                currentInput = btnDivision(currentInput);
            } else if (character === "*") {
                currentInput = btnMultiplication(currentInput);
            } else if (character === "+") {
                currentInput = btnAddition(currentInput);
            } else if (character === "-") {
                currentInput = btnSubtraction(currentInput);
            }
            break;
        case character === ".":
            currentInput = btnDecimalPoint(currentInput);
            break;
        case character === "⌫":
            currentInput = btnErase(currentInput);
            break;
        case character === "AC":
            currentInput = "";
            previewResult.textContent = "";
            break;
        case character === "=":
            if (/[^0-9)!%]$/.test(currentInput)) {
                break;
            }
            currentInput = btnEquals(currentInput, previewResult.textContent);
            break;
        default:
            console.log("Everything should be covered and this shouldn't trigger.");
    }
    currentInputSpan.textContent = currentInput;

    if (/[0-9)!%]$/.test(currentInput)) {
        let result;

        if (!/[()]/.test(currentInput)) {
            result = solveCalculation(currentInput);
        } else if (currentInput.match(/\(/g) === null || currentInput.match(/\)/g) === 
        null || currentInput.match(/\(/g).length !== currentInput.match(/\)/g).length) {
            previewResult.textContent = "( ) unequal";
            return;
        } else {
            result = eliminateParentheses(currentInput);
        }
        
        if (/^(neg)/.test(result)) {
            result = Number(result.replace("neg", "-"));
        }
        previewResult.textContent = result;
    }
}