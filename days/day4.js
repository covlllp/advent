const fs = require('fs');

function main() {
  const dataRaw = fs.readFileSync('./data/day4.txt', 'utf8');

  const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  const validationFuncs = {
    byr: yrStr => {
      const yr = parseInt(yrStr, 10);
      return yr <= 2002 && yr >= 1920;
    },
    iyr: yrStr => {
      const yr = parseInt(yrStr, 10);
      return yr <= 2020 && yr >= 2010;
    },
    eyr: yrStr => {
      const yr = parseInt(yrStr, 10);
      return yr <= 2030 && yr >= 2020;
    },
    hgt: hgtStr => {
      if (hgtStr.length < 2) return false;
      const unit = hgtStr.slice(-2);
      const hgt = hgtStr.slice(0, -2);
      if (unit === 'cm') return hgt <= 193 && hgt >= 150;
      else if (unit === 'in') return hgt <= 76 && hgt >= 59;
      else return false;
    },
    hcl: hcl => {
      if (hcl.length !== 7) return false;
      if (hcl[0] !== '#') return false;
      return hcl
        .slice(1)
        .split('')
        .every(s => {
          const charCode = s.charCodeAt(0);
          const letterCheck = charCode >= 97 && charCode < 103;
          const numberCheck = charCode >= 48 && charCode <= 57;
          return letterCheck || numberCheck;
        });
    },
    ecl: ecl => validEyeColors.includes(ecl),
    pid: pid => {
      if (pid.length !== 9) return false;
      return pid.split('').every(s => {
        const charCode = s.charCodeAt(0);
        return charCode >= 48 && charCode <= 57;
      });
    },
  };

  const passports = [];
  dataRaw.split('\n\n').forEach(s => {
    const passport = {};
    s.replace(/\n/g, ' ')
      .split(' ')
      .forEach(keyVal => {
        const pair = keyVal.split(':');
        if (pair.length === 2) {
          passport[pair[0]] = pair[1];
        }
      });
    passports.push(passport);
  });

  let count = 0;
  let secondCount = 0;
  passports.forEach(passport => {
    if (requiredKeys.every(key => passport[key])) {
      count++;
    }

    if (
      Object.keys(validationFuncs).every(key => {
        if (!passport[key]) return false;
        return validationFuncs[key](passport[key]);
      })
    )
      secondCount++;
  });
  console.log(count);
  console.log(secondCount);
}

module.exports = main;
