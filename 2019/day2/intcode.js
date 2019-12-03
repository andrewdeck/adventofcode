const fs = require('fs');


const input = fs.readFileSync('input.txt', 'utf8');


// partOne();
partTwo();

function partTwo() {
  let noun, verb;

  loop:
  for(noun = 0; noun < 100; noun++) {
    for(verb = 0; verb < 100; verb++) {
      let result = partOne(noun, verb);
      if(result === 19690720) {
        console.info(`found noun: ${noun} verb: ${verb}`);
        break loop;
      }
    }
  }
  console.info(100 * noun + verb);
}


function partOne(noun, verb) {
  let program = input.split(',').map(x => Number(x));

  // overrides
  program[1] = noun;
  program[2] = verb;

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
  
  return program[0];
}