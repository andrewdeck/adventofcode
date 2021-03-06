const fs = require('fs');
const assert = require('assert');

const real = fs.readFileSync('spreadsheet.txt', 'utf8');
const test1 = fs.readFileSync('unit_test_1.txt', 'utf8');
const test2 = fs.readFileSync('unit_test_2.txt', 'utf8');

function readRows(spreadsheet) {
  return spreadsheet.split('\n').map(row => row.split(' ').map(int => parseInt(int)));
}

function checksum(spreadsheet) {
  let sum = 0;
  const rows = readRows(spreadsheet);
  sum = rows.reduce((sum, row) => {
    return sum + (Math.max(...row) - Math.min(...row));
  }, 0);

  return sum;
}

function findTwo(row) {
  for(let j=0;j<row.length; j++) {
    for(let k=j+1; k<row.length; k++) {
      const max = Math.max(row[j],row[k]), min = Math.min(row[j],row[k]);
      if( max % min === 0) {
        return max / min;
      }
    }
  }
}

function checkdiv(spreadsheet) {
  let sum = 0, row;
  const rows = readRows(spreadsheet);
  for(let i=0;i<rows.length; i++) {
    sum += findTwo(rows[i]);
  }
  return sum;
}

assert.equal(checksum(test1), 18);

console.log('Part 1: ' + checksum(real));

assert.equal(checkdiv(test2), 9);

console.log('Part 2: ' + checkdiv(real));




