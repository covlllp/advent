const fs = require('fs');

function main() {
  const dataRaw = fs.readFileSync('./data/day5.txt', 'utf8');
  const data = dataRaw.split('\n');
  const seatIds = data.map(s => seatIdFromStr(s));
  const maxSeatId = seatIds.reduce((max, id) => Math.max(max, id));
  const minSeatId = seatIds.reduce((min, id) => Math.min(min, id));
  console.log(maxSeatId);

  const idHash = {};
  seatIds.forEach(id => {
    idHash[id] = true;
  });
  for (let i = minSeatId; i < maxSeatId; i++) {
    if (!idHash[i]) {
      if (idHash[i - 8] && idHash[i + 8]) {
        console.log(i);
      }
    }
  }
}

function seatIdFromStr(str) {
  if (str.length !== 10) return -1;

  function findIndex(strArr, initStep) {
    let val = 0;
    let step = initStep;

    strArr.forEach(s => {
      if (s === 'B' || s === 'R') val += step;
      step /= 2;
      step = Math.max(step, 0);
    });
    return val;
  }

  const strArr = str.split('');

  const row = findIndex(strArr.slice(0, 7), 64);
  const seat = findIndex(strArr.slice(7), 4);

  return row * 8 + seat;
}

module.exports = main;
