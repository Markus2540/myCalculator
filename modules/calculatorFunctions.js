'use strict';

const numbers = /[0-9]/;
const operatorGroup = /[÷*+-]/g;
const previewResult = document.getElementById("previewresult");
const historyParagraph = document.getElementById("historyparagraph");

/*
btn functions adds the logic for each button press. They check if the character can be 
inserted in to the string or not.
*/

function btnNumber(character, currentInput) {
    if (/[!)%]/.test(currentInput.slice(-1))) {
        currentInput = currentInput;
    } else if (currentInput.length === 0 && character === "0") {
        currentInput += "0.";
    } else if (character === "0" && /[^0-9.]/.test(currentInput.slice(-1))) {
        currentInput += "0.";
    } else {
        currentInput += character;
    }
    return currentInput;
}

function btnSquareRoot(currentInput) {
    if (/[0-9√!)%]/.test(currentInput.slice(-1))) {
        return currentInput;
    } else {
        return currentInput += "√";
    }
}

function btnPower(currentInput) {
    if (currentInput.length === 0 || /[^0-9)]$/.test(currentInput) || 
    /\^[0-9]+\.?[0-9]*$/.test(currentInput)) {
        return currentInput;
    } else {
        return currentInput += "^";
    }
}

function btnFactorial(currentInput) {
    if (/\(-[0-9]+$/.test(currentInput) || /^-[0-9]+$/.test(currentInput)) {
        return currentInput;
    } else if (/[-+*÷(]{1}[0-9]+$/.test(currentInput) || /^[0-9]+$/.test(currentInput)) {
        return currentInput += "!";
    } else {
        return currentInput;
    }
}

function btnOpenParenthesis(currentInput) {
    if (/[0-9!%)]/.test(currentInput.slice(-1))) {
        return currentInput;
    } else {
        return currentInput += "(";
    }
} 

function btnCloseParenthesis(currentInput) {
    if (/[^!%0-9)]/.test(currentInput.slice(-1)) || currentInput.length < 1) {
        return currentInput;
    } else {
        return currentInput += ")";
    }
}

function btnPercentage(currentInput) {
    if (/[-+*÷]{1}[0-9]+\.?[0-9]*$/.test(currentInput) || 
    /^[0-9]+\.?[0-9]*$/.test(currentInput)) {
        return currentInput += "%";
    } else {
        return currentInput;
    }
}

function btnDivision(currentInput) {
    if (/[^!%)0-9]$/.test(currentInput.slice(-1)) || currentInput.length < 1) {
        return currentInput;
    } else {
        return currentInput += "÷";
    }
}

function btnMultiplication(currentInput) {
    if (/[^)!%0-9]/.test(currentInput.slice(-1)) || currentInput.length < 1) {
        return currentInput;
    } else {
        return currentInput += "*";
    }
}

function btnAddition(currentInput) {
    if (/[^!)%0-9]/.test(currentInput.slice(-1)) || currentInput.length < 1) {
        return currentInput;
    } else {
        return currentInput += "+";
    }
}

function btnSubtraction(currentInput) {
    if (/[^\^!()%÷*0-9]/.test(currentInput.slice(-1))) {
        return currentInput;
    } else {
        return currentInput += "-";
    }
}

function btnDecimalPoint(currentInput) {
    if (/\.[0-9]*$/.test(currentInput) || /[!)%]$/.test(currentInput)) {
        return currentInput;
    } else if (currentInput.length === 0) {
        return currentInput = "0.";
    } else if (!numbers.test(currentInput.slice(-1))) {
        return currentInput += "0.";
    } else {
        return currentInput += ".";
    }
}

function btnErase(currentInput) {
    if ((currentInput.length === 2 && currentInput.endsWith("0.")) || 
    /[^0-9]0\.$/.test(currentInput)) {
        return currentInput = currentInput.slice(0, currentInput.length - 2);
    } else {
        return currentInput = currentInput.slice(0, currentInput.length - 1);
    }
}

function endsWithDecimalSeperator(currentInput) {
    if (currentInput.endsWith(".")) {
        return currentInput = currentInput.slice(0, currentInput.length - 1);
    } else {
        return currentInput;
    }
}

function btnEquals(currentInput, result) {
    historyParagraph.textContent = `${currentInput} = ${previewResult.textContent}
    
  ${historyParagraph.textContent}`;

    return currentInput = result;
}


/*
Returns the larger number of decimals from input values, for example 
1.1 + 1.113 returns 3. Usable with addition and subtraction.
*/
function makeThemInteger(a, b) {
    let multiplier = 0;
    if (a.toString().indexOf(".") !== -1) {
        multiplier = a.toString().length - (a.toString().indexOf(".") + 1);
    }
    if (b.toString().indexOf(".") !== -1) {
        if (b.toString().length - (b.toString().indexOf(".") + 1) > multiplier) {
            multiplier = b.toString().length - (b.toString().indexOf(".") + 1);
        }
    }
    return multiplier;
}

function addition(a, b) {
    let multiplier = makeThemInteger(a, b);
    return (Math.round(a * 10**multiplier) + Math.round(b * 10**multiplier)) / 10**multiplier;
}

function subtraction(a, b) {
    let multiplier = makeThemInteger(a, b);
    return (Math.round(a * 10**multiplier) - Math.round(b * 10**multiplier)) / 10**multiplier;
}

/*
Returns the number of decimals from both given values, for example 10.22 * 1.1 
returns 3.
*/
/*function makeMultiplicationInteger(a, b) {
    let multiplier = 0;
    if (a.toString().indexOf(".") !== -1) {
        multiplier = a.toString().length - (a.toString().indexOf(".") + 1);
    }
    if (b.toString().indexOf(".") !== -1) {
        multiplier += b.toString().length - (b.toString().indexOf(".") + 1);
    }
    return multiplier;
}*/
function returnNumberOfDecimals(a, b) {
    let decimals = 0;
    if (a.toString().indexOf(".") !== -1) {
        decimals = a.toString().length - (a.toString().indexOf(".") + 1);
    }
    if (b.toString().indexOf(".") !== -1) {
        decimals += b.toString().length - (b.toString().indexOf(".") + 1);
    }
    return decimals;
}

/*
Function multiplication is trying to fix floating point error by making the values 
integers and turning the product of the multiplication back to correct value. This 
however does not always work, for example multiplication(10.4, 1.1) = 11.440000000000001.
Normally I would delete this, but I'll make this into a comment for now
*/
/*
function multiplication(a, b) {
    let multiplier = makeMultiplicationInteger(a, b);
    return ((a * (10**multiplier)) * (b * (10**multiplier)) / (1 * (10**(multiplier*2))));
}
*/

/*
Calculate the product of multiplication and cut away unnecessary decimals.
*/
function multiplication(a, b) {
    let decimals = returnNumberOfDecimals(a, b);
    let product = a * b;
    return Number(product.toFixed(decimals));
}

function division(a, b) {
    return a/b;
}

function factorial(a) {
    if (a === "0") {      
        return 1;
    }
    let result = a;
    for (; a > 1; a--) {
        result *= (a-1);
    }
    return result;
}

function percentage(a) {
    return a/100;
}

function toThePowerOf(a, b) {
    if (/√/.test(b)) {
        b = squareRoot(b.replace('√', ''));
    }
    return a**b;
}

function squareRoot(a) {
    return Math.sqrt(a);
}

function eliminateParentheses(string) {
    let openParenthesis = [];
    let closeParenthesis = [];
    let shortestGap = [];
    let shortestGapLength;

    //Map the locations of opening and closing parentheses.
    for (let i = 0; i < string.length; i++) {
        if (string[i] === "(") {
            openParenthesis.push(i);
            continue;
        }
        if (string[i] === ")") {
            closeParenthesis.push(i);
            continue;
        }
    }

    shortestGap = [openParenthesis[0], closeParenthesis[0]];
    shortestGapLength = closeParenthesis[0] - openParenthesis[0];

    //This finds the shortest string of characters encased in parentheses.
    for (let i = 0; i < openParenthesis.length; i++) {
        for (let j = 0; j < closeParenthesis.length; j++) {
            if (closeParenthesis[j] - openParenthesis[i] < shortestGapLength && 
                closeParenthesis[j] - openParenthesis[i] > 0) {
                shortestGapLength = closeParenthesis[j] - openParenthesis[i];
                shortestGap = [openParenthesis[i], closeParenthesis[j]];
            }
        }
    }

    /*
    Replaces closing and opening parentheses of the shortest string of characters
    encased in parentheses. First replaces closing parenthesis, then solves the 
    calculation that was enclosed inside the parentheses and then replaces the 
    opening parenthesis. Reruns eliminateParentheses if the string had 2 or more 
    of opening parentheses.
    */
    if (/[0-9(]/.test(string[shortestGap[1] + 1])) {
        string = string.replace(string[shortestGap[1]], '*');
    } else {
        string = string.replace(string[shortestGap[1]], '');
    }

    let result = solveCalculation(string.slice(shortestGap[0] + 1, shortestGap[1]));

    string = `${string.slice(0, shortestGap[0])}${result}${string.slice(
        shortestGap[1], string.length)}`;

    if (openParenthesis.length > 1) {
        return eliminateParentheses(string);
    } else {
        return solveCalculation(string);
    }
}

/*
This function goes through the given array of values. It converts positive number 
strings to numbers and calculates square roots, percentage values (if possible) and 
solves factorials and powers. Returns an array of positive numbers and negative strings.
*/
function processValues(values) {
    for (let i = 0; i < values.length; i++) {
        if (/%/.test(values[i])) {
            if (i === 0) {
                values[i] = values[i].replace("%", "");
                values[i] = percentage(values[i].replace("neg", "-"));
            }
            if (values[i] < 0) {
                values[i] = values[i].toString();
                values[i] = values[i].replace("-", "neg");
            }
        } else if (/!/.test(values[i])) {
            values[i] = values[i].replace("!", "");
            values[i] = factorial(values[i]);
        } else if (/√/.test(values[i])) {
            values[i] = values[i].replace("√", "");
            values[i] = squareRoot(values[i]);
        } else if (/\^/.test(values[i])) {
            if (/(neg)/.test(values[i])) {
                values[i] = values[i].toString();
                values[i] = values[i].replaceAll("neg", "-");
            }
            let powers = values[i].split("^");
            values[i] = toThePowerOf(powers[0], powers[1]);
            if (values[i] < 0) {
                values[i] = values[i].toString();
                values[i] = values[i].replace("-", "neg");
            }
        } else {
            if (!/(neg)/.test(values[i])) {
                values[i] = Number(values[i]);
            } else {
                values[i] = values[i];
            }
        }
    }
    return values;
}

function solveMultiplicationDivision(values, operators) {
    values.forEach((value, i) => {
        if (/(neg)/.test(value) && !/%/.test(value)) {
            values[i] = Number(value.replace("neg", "-"));
        }
    });
    
    for (let i = 0; i < operators.length; i++) {
        if (/÷/.test(operators[i])) {
            if (/%/.test(values[i])) {
                values[i] = values[i].replace("%", "");
                values[i] = percentage(values[i].replace("neg", "-"));
            }
            if (/%/.test(values[i + 1])) {
                values[i + 1] = values[i + 1].replace("%", "");
                values[i + 1] = percentage(values[i + 1].replace("neg", "-"));
            }
            values.splice(i, 2, division(values[i], values[i + 1]));
            operators.splice(i, 1);
            i--;
            continue;
        }
        if (/\*/.test(operators[i])) {
            if (/%/.test(values[i])) {
                values[i] = values[i].replace("%", "");
                values[i] = percentage(values[i].replace("neg", "-"));
            }
            if (/%/.test(values[i + 1])) {
                values[i + 1] = values[i + 1].replace("%", "");
                values[i + 1] = percentage(values[i + 1].replace("neg", "-"));
            }
            values.splice(i, 2, multiplication(values[i], values[i + 1]));
            operators.splice(i, 1);
            i--;
            continue;
        }
    }
    return [values, operators];
}

function solveAdditionSubtraction(values, operators) {
    for (let i = 0; i < operators.length; i++) {
        if (/\+/.test(operators[i])) {
            if (/%/.test(values[i + 1])) {
                values[i + 1] = values[i + 1].replace("%", "");
                values[i + 1] = multiplication(values[i], percentage(values[i + 1].replace("neg", "-")));
            }
            values.splice(i, 2, addition(values[i], values[i + 1]));
            operators.splice(i, 1);
            i--;
            continue;
        }
        if (/-/.test(operators[i])) {
            if (/%/.test(values[i + 1])) {
                values[i + 1] = values[i + 1].replace("%", "");
                values[i + 1] = multiplication(values[i], percentage(values[i + 1].replace("neg", "-")));
            }
            values.splice(i, 2, subtraction(values[i], values[i + 1]));
            operators.splice(i, 1);
            i--;
            continue;
        }
    }

    if (/^-/.test(values)) {
        values = values.toString();
        values = values.replace("-", "neg");
    } else {
        values = Number(values);
    }

    return values;
}

/*
This function adds neg in front of a negative value. For example 4*-4 becomes
4*neg4.
*/
function handleNegatives(string) {
    string = string.replaceAll("*-", "*neg");
    string = string.replaceAll("+-", "+neg");
    string = string.replaceAll("--", "-neg");
    string = string.replaceAll("÷-", "÷neg");
    string = string.replaceAll("^-", "^neg");
    return string;
}

/*
The following function takes a string that has no parentheses and returns the 
solved calculation.
*/
function solveCalculation(string) {
    if (/-/.test(string[0])) {
        string = string.replace("-", "neg");
    }

    string = handleNegatives(string);

    //Get operators from the string.
    let operators = string.match(operatorGroup);
    
    //Get values from the string.
    let values = processValues(string.split(operatorGroup));

    if (operators === null) {
        return values[0];
    }

    /*
    Solve multiplications and divisions. Returns an array in which [0] = values 
    and [1] = operators.
    */
    let result = solveMultiplicationDivision(values, operators);

    /*
    Solve additions and subtractions and return a positive number (42) or a 
    negative string ("neg42").
    */
    return solveAdditionSubtraction(result[0], result[1]);
}

/*
If you want to run this application in a browser you have to have export 
part uncommented and module.exports commented out, but if you want to run 
jest tests you have to comment out the export and uncomment module.exports.
*/
export {
    makeThemInteger,
    addition,
    subtraction,
    returnNumberOfDecimals,
    multiplication,
    division,
    factorial,
    percentage,
    toThePowerOf,
    squareRoot,
    eliminateParentheses,
    processValues,
    solveMultiplicationDivision,
    solveAdditionSubtraction,
    handleNegatives,
    solveCalculation,
    btnNumber,
    btnSquareRoot,
    btnPower,
    btnFactorial,
    btnOpenParenthesis,
    btnCloseParenthesis,
    btnPercentage,
    btnDivision,
    btnMultiplication,
    btnAddition,
    btnSubtraction,
    btnDecimalPoint,
    btnErase,
    endsWithDecimalSeperator,
    btnEquals
};

/*module.exports = {
    makeThemInteger,
    addition,
    subtraction,
    returnNumberOfDecimals,
    multiplication,
    division,
    factorial,
    percentage,
    toThePowerOf,
    squareRoot,
    eliminateParentheses,
    processValues,
    solveMultiplicationDivision,
    solveAdditionSubtraction,
    handleNegatives,
    solveCalculation,
    btnNumber,
    btnSquareRoot,
    btnPower,
    btnFactorial,
    btnOpenParenthesis,
    btnCloseParenthesis,
    btnPercentage,
    btnDivision,
    btnMultiplication,
    btnAddition,
    btnSubtraction,
    btnDecimalPoint,
    btnErase,
    endsWithDecimalSeperator,
    btnEquals
};*/