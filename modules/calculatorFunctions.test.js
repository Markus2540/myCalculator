/**
 * @jest-environment jsdom
 */

const { makeThemInteger,
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
    btnEquals } = require('./calculatorFunctions');

test('Additions', () => {
    expect(addition('1', '2')).toBe(3);
    expect(addition('0.1', '0.2')).toBe(0.3);
    expect(addition('1.14', '1.1')).toBe(2.24);
    expect(addition('1.1', '1.14')).toBe(2.24);
    expect(addition('0.0003', '0.0001')).toBe(0.0004);
});

test('Subtractions', () => {
    expect(subtraction('8', '5')).toBe(3);
    expect(subtraction('9.8', '0.1')).toBe(9.7);
    expect(subtraction('5.5', '7.39')).toBe(-1.89);
});

test('Returns multiplier based on the location of dot in a given value', () => {
    expect(makeThemInteger('1', '2')).toBe(0);
    expect(makeThemInteger('1', '2.3')).toBe(1);
    expect(makeThemInteger('11.12', '3.2')).toBe(2);
    expect(makeThemInteger('3.2', '11.12')).toBe(2);
});

test('Returns number of decimals', () => {
    expect(returnNumberOfDecimals('7', '5')).toBe(0);
    expect(returnNumberOfDecimals('7.5', '3')).toBe(1);
    expect(returnNumberOfDecimals('7', '3.2')).toBe(1);
    expect(returnNumberOfDecimals('5.23', '2.33')).toBe(4);
});

test('Multiplication', () => {
    expect(multiplication('4', '5')).toBe(20);
    expect(multiplication('5.42', '7.83')).toBe(42.4386);
    expect(multiplication('-5', '3')).toBe(-15);
    expect(multiplication('4.5', '1.1115')).toBe(5.00175);
});

test('Division', () => {
    expect(division('8', '2')).toBe(4);
});

test('Factorial', () => {
    expect(factorial('5')).toBe(120);
    expect(factorial('0')).toBe(1);
});

test('Percentage', () => {
    expect(percentage('50')).toBe(0.5);
});

test('To the power of', () => {
    expect(toThePowerOf('4', '3')).toBe(64);
    expect(toThePowerOf('-5', '-5')).toBeCloseTo(-0.00032);
    expect(toThePowerOf('4', '√4')).toBe(16);
});

test('Squareroot', () => {
    expect(squareRoot('4')).toBe(2);
});

test('Eliminate parentheses', () => {
    expect(eliminateParentheses('(2+2)*(2+2)')).toBe(16);
    expect(eliminateParentheses('2+(3+3)^4')).toBe(1298);
});

test('Test processValues', () => {
    expect(processValues(['50%','5!', '√4', '5^4', '4', 'neg4'])).toEqual([0.5, 120, 2, 625, 4, 'neg4']);
    expect(processValues(['50%', 'neg50%'])).toEqual([0.5, 'neg50%']);
    expect(processValues(['neg50%', '50%'])).toEqual(['neg0.5', '50%']);
    expect(processValues(['5^5', 'neg5^5'])).toEqual([3125, 'neg3125']);
    //expect(processValues(['5^neg5', 'neg5^neg5'])).toEqual([expect.closeTo(0.00032), 'neg0.00032']);
    expect(processValues(['5^neg5'])).toEqual([expect.closeTo(0.00032)]);
});

test('Test solveMultiplicationDivision', () => {
    expect(solveMultiplicationDivision([4, 5], ['*'])).toEqual([[20], []]);
    expect(solveMultiplicationDivision(['neg4', 5], ['*'])).toEqual([[-20], []]);
    expect(solveMultiplicationDivision([4, 5, 2], ['*', '+'])).toEqual([[20, 2], ['+']]);
    expect(solveMultiplicationDivision([4, '50%', 2], ['*', '+'])).toEqual([[2, 2], ['+']]);
    expect(solveMultiplicationDivision([4, 5, '50%'], ['*', '+'])).toEqual([[20, '50%'], ['+']]);
    expect(solveMultiplicationDivision([8, 2], ['÷'])).toEqual([[4],[]]);
    expect(solveMultiplicationDivision([4, 5, '50%', 2], ['*', '+', '*'])).toEqual([[20, 1], ['+']]);
    expect(solveMultiplicationDivision([4, 5, '50%', 2], ['*', '+', '+'])).toEqual([[20, '50%', 2], ['+', '+']]);
    expect(solveMultiplicationDivision([4, '50%', 2], ['*', '÷'])).toEqual([[1], []]);
    expect(solveMultiplicationDivision([4, '50%', 2], ['÷', '+'])).toEqual([[8, 2], ['+']]);
});

test('Test solveAdditionSubtraction', () => {
    expect(solveAdditionSubtraction([4, 5, 2], ['+', '-'])).toBe(7);
    expect(solveAdditionSubtraction([-4, 5, 2], ['+', '-'])).toBe('neg1');
    expect(solveAdditionSubtraction([4, 5, 2], ['-', '-'])).toBe('neg3');
});

test('Test handleNegatives', () => {
    expect(handleNegatives('4*-5')).toBe('4*neg5');
    expect(handleNegatives('4*-5*-5')).toBe('4*neg5*neg5');
});

test('Test solveCalculation', () => {
    expect(solveCalculation('4*5-2')).toBe(18);
    expect(solveCalculation('2-4*5')).toBe('neg18');
    expect(solveCalculation("145+578+15%")).toBe(831.45);
    expect(solveCalculation("-145+-578+0.15+5!")).toBe('neg602.85');
    expect(solveCalculation("5+2*7÷2-4!+√4+50%")).toBe('neg15');
});

test('Test btnNumber', () => {
    expect(btnNumber('4', "")).toBe('4');
    expect(btnNumber('0', "")).toBe('0.');
    expect(btnNumber('4', "4!")).toBe('4!');
    expect(btnNumber('4', "4^")).toBe('4^4');
    expect(btnNumber('4', "4%")).toBe('4%');
    expect(btnNumber('4', "(2+2)")).toBe('(2+2)');
    expect(btnNumber('4', "(")).toBe('(4');
    expect(btnNumber('4', "4÷")).toBe('4÷4');
    expect(btnNumber('4', "4*")).toBe('4*4');
    expect(btnNumber('4', "4-")).toBe('4-4');
    expect(btnNumber('4', "4+")).toBe('4+4');
});

test('Test btnSquareRoot', () => {
    expect(btnSquareRoot("")).toBe("√");
    expect(btnSquareRoot("4")).toBe("4");
    expect(btnSquareRoot("4^")).toBe("4^√");
    expect(btnSquareRoot("4!")).toBe("4!");
    expect(btnSquareRoot("(")).toBe("(√");
    expect(btnSquareRoot("(2+2)")).toBe("(2+2)");
    expect(btnSquareRoot("4*")).toBe("4*√");
});

test('Test btnPower', () => {
    expect(btnPower("")).toBe("");
    expect(btnPower("4")).toBe("4^");
    expect(btnPower("4^")).toBe("4^");
    expect(btnPower("√")).toBe("√");
    expect(btnPower("4!")).toBe("4!");
    expect(btnPower("(")).toBe("(");
    expect(btnPower("(4+4)")).toBe("(4+4)^");
    expect(btnPower("50%")).toBe("50%");
    expect(btnPower("4÷")).toBe("4÷");
    expect(btnPower("4*")).toBe("4*");
    expect(btnPower("4-")).toBe("4-");
    expect(btnPower("4+")).toBe("4+");
    expect(btnPower("4^4.4")).toBe("4^4.4");
});

test('Test btnFactorial', () => {
    expect(btnFactorial("")).toBe("");
    expect(btnFactorial("4")).toBe("4!");
    expect(btnFactorial("√")).toBe("√");
    expect(btnFactorial("4^")).toBe("4^");
    expect(btnFactorial("4!")).toBe("4!");
    expect(btnFactorial("(")).toBe("(");
    expect(btnFactorial("(4)")).toBe("(4)");
    expect(btnFactorial("50%")).toBe("50%");
    expect(btnFactorial("4÷")).toBe("4÷");
    expect(btnFactorial("4*")).toBe("4*");
    expect(btnFactorial("4-")).toBe("4-");
    expect(btnFactorial("4+")).toBe("4+");
    expect(btnFactorial("-4")).toBe("-4");
    expect(btnFactorial("-4.4")).toBe("-4.4");
    expect(btnFactorial("-4+4")).toBe("-4+4!");
});

test('Test btnOpenParenthesis', () => {
    expect(btnOpenParenthesis("")).toBe("(");
    expect(btnOpenParenthesis("4")).toBe("4");
    expect(btnOpenParenthesis("4!")).toBe("4!");
    expect(btnOpenParenthesis("4%")).toBe("4%");
});

test('Test btnCloseParenthesis', () => {
    expect(btnCloseParenthesis("")).toBe("");
    expect(btnCloseParenthesis("4÷")).toBe("4÷");
    expect(btnCloseParenthesis("4*")).toBe("4*");
    expect(btnCloseParenthesis("4-")).toBe("4-");
    expect(btnCloseParenthesis("4+")).toBe("4+");
    expect(btnCloseParenthesis("!")).toBe("!)");
    expect(btnCloseParenthesis("%")).toBe("%)");
    expect(btnCloseParenthesis("4")).toBe("4)");
});

test('Test btnPercentage', () => {
    expect(btnPercentage("")).toBe("");
    expect(btnPercentage("50")).toBe("50%");
    expect(btnPercentage("50.7")).toBe("50.7%");
    expect(btnPercentage("-50")).toBe("-50%");
    expect(btnPercentage("7+50")).toBe("7+50%");
    expect(btnPercentage("7+50.7")).toBe("7+50.7%");
    expect(btnPercentage("7-50")).toBe("7-50%");
    expect(btnPercentage("√")).toBe("√");
    expect(btnPercentage("7^")).toBe("7^");
    expect(btnPercentage("7!")).toBe("7!");
});

test('Test btnDivision', () => {
    expect(btnDivision("")).toBe("");
    expect(btnDivision("7")).toBe("7÷");
    expect(btnDivision("7!")).toBe("7!÷");
    expect(btnDivision("7%")).toBe("7%÷");
    expect(btnDivision("(2+2)")).toBe("(2+2)÷");
    expect(btnDivision("7*")).toBe("7*");
    
});

test('Test btnMultiplication', () => {
    expect(btnMultiplication("")).toBe("");
    expect(btnMultiplication("7")).toBe("7*");
    expect(btnMultiplication("7!")).toBe("7!*");
    expect(btnMultiplication("7%")).toBe("7%*");
    expect(btnMultiplication("(2+2)")).toBe("(2+2)*");
    expect(btnMultiplication("7*")).toBe("7*");
});

test('Test btnAddition', () => {
    expect(btnAddition("")).toBe("");
    expect(btnAddition("7")).toBe("7+");
    expect(btnAddition("7!")).toBe("7!+");
    expect(btnAddition("7%")).toBe("7%+");
    expect(btnAddition("(2+2)")).toBe("(2+2)+");
    expect(btnAddition("7*")).toBe("7*");
});

test('Test btnSubtraction', () => {
    expect(btnSubtraction("")).toBe("-");
    expect(btnSubtraction("√")).toBe("√");
    expect(btnSubtraction("7^")).toBe("7^-");
    expect(btnSubtraction("5!")).toBe("5!-");
    expect(btnSubtraction("(")).toBe("(-");
    expect(btnSubtraction("(8)")).toBe("(8)-");
    expect(btnSubtraction("50%")).toBe("50%-");
    expect(btnSubtraction("7÷")).toBe("7÷-");
    expect(btnSubtraction("4*")).toBe("4*-");
    expect(btnSubtraction("4-")).toBe("4-");
    expect(btnSubtraction("4+")).toBe("4+");
});

test('Test btnDecimalPoint', () => {
    expect(btnDecimalPoint("")).toBe("0.");
    expect(btnDecimalPoint("7.5+2")).toBe("7.5+2.");
    expect(btnDecimalPoint("0.")).toBe("0.");
    expect(btnDecimalPoint("4.44")).toBe("4.44");
    expect(btnDecimalPoint("7+4.44")).toBe("7+4.44");
    expect(btnDecimalPoint("7!")).toBe("7!");
    expect(btnDecimalPoint("(2+2)")).toBe("(2+2)");
    expect(btnDecimalPoint("50%")).toBe("50%");
    expect(btnDecimalPoint("50")).toBe("50.");
});

test('Test btnErase', () => {
    expect(btnErase("")).toBe("");
    expect(btnErase("0.")).toBe("");
    expect(btnErase("70.")).toBe("70");
    expect(btnErase("4+0.")).toBe("4+");
    expect(btnErase("√0.")).toBe("√");
    expect(btnErase("√70.")).toBe("√70");
    expect(btnErase("8^0.")).toBe("8^");
    expect(btnErase("9!")).toBe("9");
});

test('Test endsWithDecimalSeperator', () => {
    expect(endsWithDecimalSeperator("70.")).toBe("70");
    expect(endsWithDecimalSeperator("70.2")).toBe("70.2");
    expect(endsWithDecimalSeperator("70")).toBe("70");
});

/*test('Test btnEquals', () => {
});*/