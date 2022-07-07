const prompt = require("prompt-sync")({sigint: true});

const operator = prompt('Enter operator ( either +, -, * or / ):');

let number1 = parseFloat(prompt('Enter 1st number: '));
let number2 = parseFloat(prompt('Enter 2nd number: '));

let result;

switch(operator) {
    case '+':
        result = number1 + number2;
        console.log(`${number1} + ${number2} = ${result}`);
        break;
    
    case '-':
        result = number1 - number2;
        console.log(`${number1} - ${number2} = ${result}`);
        break;
    
    case '*':
        result = number1 * number2;
        console.log(`${number1} * ${number2} = ${result}`);
        break;

    case '/':
        result = number1 / number2;
        console.log(`${number1} / ${number2} = ${result}`);
        break;

    default:
        console.log('Invalid operator');
        break;
}