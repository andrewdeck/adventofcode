const fs = require('fs');


const input = fs.readFileSync('input.txt', 'utf8');


partOne();



function partOne() {
  let program = input.split(',').map(x => Number(x));

  // overrides
  program[1] = 12;
  program[2] = 2;

  let cur = 0;

  while(program[cur] !== 99) {
    let instruction = program[cur];
    if(instruction !== 1 && instruction !== 2) {
      console.error(`Encountered invalid instruction code: ${instruction}`);
      break;
    }
    let aPos = program[cur+1],
      bPos = program[cur+2],
      destination = program[cur+3];

    let aVal = program[aPos],
      bVal = program[bPos];

    program[destination] = instruction === 1 ? aVal + bVal : aVal * bVal;

    cur += 4;
  }
  
  console.info(program[0]);
}