const fs = require('fs');

real = fs.readFileSync('spreadsheet.txt', 'utf8');
test1 = fs.readFileSync('unit_test_1.txt', 'utf8');
test2 = fs.readFileSync('unit_test_2.txt', 'utf8');

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

if(checksum(test1) === 18 && checkdiv(test2) === 9) {
  console.log('Part 1: ' + checksum(real));
	console.log('Part 2: ' + checkdiv(real));
} else {
	console.log('Unit tests failed');
  console.log(checkdiv(test2));
}



