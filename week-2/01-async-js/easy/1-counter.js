
// Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript It should go up as time goes by in intervals of 1 second

//did not want to create index.html ..

const readline = require('readline');

function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
}

let counter = 0;

setInterval(() => {
  clearLine();
  process.stdout.write(String(counter++));
}, 1000);