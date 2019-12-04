const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');

unitTestOne();
partOne();


function partOne() {
  let [wire1, wire2] = input.split('\n');
  assert.equal(findClosestIntersection(wire1, wire2), 2050);
}

function findClosestIntersection(wire1, wire2) {
  wire1 = wire1.split(',');
  wire2 = wire2.split(',');

  let path1 = ['x0y0'];
  let x = 0, y = 0;
  for(let i = 0; i< wire1.length; i++){
    let instruction = wire1[i];
    let direction = instruction.substring(0,1);
    let length = Number(instruction.substring(1));
    for(let j = 0; j < length; j++) {
      if(direction === 'U') {
        y++;
      } else if(direction === 'D') {
        y--;
      } else if(direction === 'R') {
        x++;
      } else if(direction === 'L') {
        x--;
      }
      path1.push(`x${x}y${y}`);
    }
  }

  let shortestDistance;
  x = 0, y = 0;
  let path2 = ['x0y0'];
  for(let i = 0; i< wire2.length; i++){
    let instruction = wire2[i];
    let direction = instruction.substring(0,1);
    let length = Number(instruction.substring(1));
    for(let j = 0; j < length; j++) {
      if(direction === 'U') {
        y++;
      } else if(direction === 'D') {
        y--;
      } else if(direction === 'R') {
        x++;
      } else if(direction === 'L') {
        x--;
      }
      path2.push(`x${x}y${y}`);
      if(path1.indexOf(`x${x}y${y}`) > -1) {
        console.log(`found an intersection x: ${x} y: ${y}`);
        let distance = Math.abs(x) + Math.abs(y);
        if(!shortestDistance || distance < shortestDistance) {
          shortestDistance = distance;
        }
      }
    }
  }
  return shortestDistance;
}

function unitTestOne() {
  let wireA = 'R8,U5,L5,D3',
      wireB = 'U7,R6,D4,L4';

  assert.equal(findClosestIntersection(wireA, wireB), 6);


  let wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72',
      wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
  
  assert.equal(findClosestIntersection(wire1,wire2), 159);

  let wire3 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      wire4 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';

  assert.equal(findClosestIntersection(wire3, wire4), 135);
}