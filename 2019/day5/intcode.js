const fs = require('fs');


const file = fs.readFileSync('input.txt', 'utf8');


partOne(1);


function partOne(input) {
  let program = file.split(',');
  // let program = [3,0,4,0,99];

  let cur = 0;

  function getParam(pos, instruction) {
    let mode = instruction.slice(-2-pos, -1-pos);
    let val;
    if(mode === '1') val = program[cur+pos];
    else val = program[program[cur+pos]];
    return Number(val);
  }

  while(program[cur] !== '99') {
    let instruction = program[cur]+'';
    // console.log(`cur: ${cur} instruction: ${instruction}`);
    let opcode = Number(instruction.slice(-2));
    if(opcode === 1) { // add
      // console.log('adding');
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = program[cur+3];

      // console.log(`writing ${a} + ${b} to ${dest}`);
      program[dest] = a + b;
      cur += 4;
    } else if(opcode === 2) {// multiply
      // console.log('multiplying');
      let a = getParam(1, instruction),
          b = getParam(2, instruction),
          dest = program[cur+3];
      program[dest] = a * b;
      cur += 4;
    } else if (opcode === 3) { // write from input
      let dest = program[cur+1];
      // console.log(`writing ${input} to ${dest}`);
      program[dest] = input;
      cur += 2;
    } else if (opcode === 4) { // ouptut to input
      let source = program[cur+1];
      input = program[source];
      // console.log(`cur: ${cur} Output: ${input} from ${source}`);
      console.log(input);
      cur += 2;
    } else {
      console.error('something went wrong');
      console.error(instruction);
      break;
    }
  }
}

