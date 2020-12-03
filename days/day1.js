const fs = require('fs');

function main() {
  const dataRaw = fs.readFileSync('./data/day1.txt', 'utf8');

  const data = dataRaw.split('\n').map(s => parseInt(s));

  const map = {};
  const result = [];

  data.forEach(val => {
    const diff = 2020 - val;
    if (map[val]) {
      result.push(val);
    }
    map[diff] = val;
  });

  if (result.length === 1) {
    console.log(result[0] * (2020 - result[0]));
  } else {
    console.log('something went wrong');
  }

  const secondResult = [];

  data.forEach((val, i) => {
    const hash = {};
    for (let j = i + 1; j < data.length; j++) {
      const nextVal = data[j];
      const diff = 2020 - val - nextVal;
      if (hash[nextVal]) {
        secondResult.push(val);
        secondResult.push(nextVal);
        secondResult.push(diff);
      }
      hash[diff] = val;
    }
  });

  if (secondResult.length === 3) {
    console.log(secondResult[0] * secondResult[1] * secondResult[2]);
  } else {
    console.log('nothing');
  }
}

module.exports = main;
