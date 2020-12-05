const fs = require('fs');

function main() {
  const dataRaw = fs.readFileSync('./data/day3.txt', 'utf8');

  const data = [];
  dataRaw.split('\n').forEach(s => {
    if (!s.length) return;
    data.push(s);
  });

  const slopes = [1, 3, 5, 7, 0.5];
  const counts = new Array(5).fill(0);
  for (let i = 0; i < data.length; i++) {
    const right = slopes.map(x => x * i);
    const trees = data[i];
    const inds = right.map(x => x % trees.length);

    inds.forEach((ind, j) => {
      if (ind % 1 !== 0) return;

      if (trees[ind] === '#') counts[j]++;
    });
  }
  console.log(counts.reduce((acc, val) => val * acc));
}

module.exports = main;
