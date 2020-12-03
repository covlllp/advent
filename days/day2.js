const fs = require('fs');

function main() {
  const dataRaw = fs.readFileSync('./data/day2.txt', 'utf8');
  const data = dataRaw.split('\n').map(s => {
    const arr = s.split(':');
    if (arr.length !== 2) return [];
    arr[1] = arr[1].trim();
    return arr;
  });
  let validCount = 0;
  let secondCount = 0;

  data.forEach(val => {
    if (val.length !== 2) return;

    const password = val[1];
    const params = val[0].split(' ');
    const letter = params[1];
    const limits = params[0].split('-');
    const min = parseInt(limits[0]);
    const max = parseInt(limits[1]);

    const count = password.split('').reduce((count, l) => {
      if (l === letter) {
        count++;
      }
      return count;
    }, 0);
    if (count >= min && count <= max) validCount++;

    const firstI = min - 1;
    const secondI = max - 1;
    if (
      (password[firstI] === letter || password[secondI] === letter) &&
      password[firstI] !== password[secondI]
    ) {
      secondCount++;
    }
  });

  console.log(validCount);
  console.log(secondCount);
}

module.exports = main;
