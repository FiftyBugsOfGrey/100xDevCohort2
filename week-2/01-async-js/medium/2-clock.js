/*
Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats - 

 - HH:MM::SS (Eg. 13:45:23)

 - HH:MM::SS AM/PM (Eg 01:45:23 PM)

*/

const readline = require('readline');

function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
}

setInterval(() => {
  clearLine();
  process.stdout.write(`${new Date().toString().replace(/.+?(\d+:\d+:\d+).+/, "$1")}`);
}, 1000);