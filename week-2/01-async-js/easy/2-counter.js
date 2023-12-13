
// Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)


//did not want to create index.html ..

const readline = require('readline');

function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
}

let counter = 0;

function writeCounter() {
  setTimeout(() => {
    clearLine();
    process.stdout.write(String(counter++));
    writeCounter();
  }, 1000);
}


setTimeout(() => {
  writeCounter
}, 0);