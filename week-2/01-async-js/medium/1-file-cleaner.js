const fs = require('fs');
const fileName = 'toClean.txt';
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = data.replaceAll(/\s+/g, ' ').trim();

  fs.writeFile(fileName, data, err => {
    if (err) {
      console.error(err);
    }
    console.log("file written successfully!")
  });
});