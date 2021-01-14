const fs = require('fs');
const lodash = require('lodash');

function main() {
  const dataRaw = fs.readFileSync('./data/day6.txt', 'utf8');
  const groups = dataRaw.split('\n\n').map(group => group.split('\n'));
  const groupAnswerTotals = groups.reduce((total, group) => {
    const answerHash = {};
    group.forEach(answer => {
      answer.split('').forEach(s => {
        answerHash[s] = true;
      });
    });
    return total + Object.keys(answerHash).length;
  }, 0);
  console.log(groupAnswerTotals);

  const everyAnswerTotal = groups.reduce((total, group) => {
    return total + getEveryAnswer(group).length;
  }, 0);
  console.log(everyAnswerTotal);
  console.log(getEveryAnswer(['bc', 'a']));
}

function getEveryAnswer(answers) {
  const intersection = answers
    .map(x => x.split(''))
    .reduce((a, b) => a.filter(c => b.includes(c)));
  return intersection;
}

module.exports = main;
