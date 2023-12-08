/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num
  }

  subtract(num) {
    this.result -= num
  }

  multiply(num) {
    this.result *= num
  }

  divide(num) {
    if (num) {
      this.result /= num
    } else {
      throw new Error("division by zero");;
    }
  }

  calculate(expression) {
    // check if the expression has misplaced decimal
    // invalid: 5 . 6
    // invalid: 5 . +
    // a decimal must have a number before and after it
    if (expression.indexOf('.') > -1) {
      if (expression.match(/\.\D/) || expression.match(/\D\./)) {
        throw new Error("incorrect decimal");;
      }
    }

    // check if there are no invalid spaces
    // invalid: 5 6 + 3 (space between 5 and 6 is invalid)
    if (expression.match(/\d\s+\d/)) {
      throw new Error("invalid space between numbers");;
    }

    // remove all spaces
    expression = expression.replaceAll(' ', '');

    // (5+6)(6-2) = (5+6)*(6-2)
    // so insert * between brackets
    expression = expression.replaceAll(')(', ')*(');


    // need to check the special characeters in the expression
    // first remove all digits
    // split it to make an array
    // make a set from this array to remove the duplicates
    // make an array from this set in order to iterate over elements
    // to make sure all the special characters in the experession is valid '+-*/().'
    let specialCharsInExp = Array.from(new Set(expression.replaceAll(/\d/g, '').split('')));
    let validSpecialChars = '+-*/().';
    if (specialCharsInExp.some(char => !validSpecialChars.includes(char))) {
      throw new Error("illegal character");;
    }


    // need to check divide by zero
    // 2/0 is wrong, but 2/0.5 is not
    // first find index of "/0" and then check if it is followed by a decimal
    // if no decimal, then divide by error exception
    let searchPosition = 0;

    do {
      searchPosition = expression.indexOf('/0', searchPosition);
      if (searchPosition > -1 && expression[searchPosition + 2] != '.') {
        throw new Error("divide by zero");;
      }
    } while (expression.indexOf('\0', searchPosition) > -1);

    let bracketCounter = 0;
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === '(') {
        bracketCounter++
      }
      if (expression[i] === ')') {
        bracketCounter--
        if (bracketCounter < 0) throw new Error("mismatch");
      }
    };

    if (bracketCounter !== 0) {
      throw new Error("mismatch")
    }

    this.result = new Function('return ' + expression)()

  }

  clear() {
    this.result = 0
  }

  getResult() {
    return this.result
  }

}

module.exports = Calculator;
/*
 PASS  ../tests/calculator.test.js
  Calculator
    ✓ addition (2 ms)
    ✓ subtraction (1 ms)
    ✓ multiplication (1 ms)
    ✓ division (8 ms)
    ✓ clear
    ✓ calculate addition and multiplication (1 ms)
    ✓ calculate division in expression
    ✓ calculate subtraction in expression (1 ms)
    ✓ calculate complex expression
    ✓ calculate complex expression with spaces
    ✓ calculate expression with decimals (1 ms)
    ✓ calculate expression with invalid characters (1 ms)
    ✓ calculate division by zero (1 ms)
    ✓ multiplication with negative numbers (1 ms)
    ✓ division with decimal numbers
    ✓ expression with invalid parentheses (1 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        0.351 s, estimated 1 s
Ran all test suites matching /.\/tests\/calculator.test.js/i.
*/
