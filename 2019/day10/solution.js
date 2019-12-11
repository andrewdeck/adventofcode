const fs = require('fs');
const assert = require('assert');
const _ = require('lodash');
const file = fs.readFileSync('input.txt', 'utf8');
const unit58 = fs.readFileSync('unit-5-8.txt', 'utf8');
const unit34 = fs.readFileSync('unit-3-4.txt', 'utf8');
const unit1113 = fs.readFileSync('unit-11-13.txt', 'utf8');


// unitTestPartOne();
// partOne();
// unitTestPartTwo();
partTwo();



function partOne() {
  console.log(calculateBestLocation(file));
}

function partTwo() {
  console.log(calculate200(file, 17, 22));
}


function calculate200(map, astX, astY) {
  //Math.atan(1) * 180 / Math.PI
  let height, width;
  let original = map.split('\n').map(row => row.split(''));
  width = original[0].length;
  height = original.length;

  let asteroids = [];

  for(let x=0;x<width; x++) {
    for(let y=0;y<height; y++) {
      if(original[y][x] === '#') {
        let angle = calculateAngle(x - astX, y - astY);
        let ast = {
          x, y, angle,
          distance: Math.sqrt(x*x+y*y)
        };
        asteroids.push(ast);
      }
    }
  }

  let angles = _.sortBy(_.uniq(_.map(asteroids, 'angle')));
  angles = angles.map(angle => {
    return _.sortBy(asteroids.filter(ast => ast.angle === angle), 'distance');
  });
  // console.log(angles[0]);
  let exploded = [];
  let i = 0;
  while(exploded.length !== asteroids.length) {
    let ast = angles[i%angles.length].shift();
    if(ast) exploded.push(ast);
    i++;
  }

  // console.log(exploded);
  return exploded[199];
}


function calculateAngle(dX, dY) {
  let angle = Math.atan2(-dY, dX) * 180 / Math.PI;
  if(angle < 0) angle += 360; // 0-360
  angle = (angle + 270) % 360; // rotate 90 so zero is up
  angle = 360 - angle; // invert so angles increase clockwise
  if(angle === 360) angle = 0;
  return angle;
}

function calculateBestLocation(map) {
  let height, width;
  let original = map.split('\n').map(row => row.split(''));
  let computed = map.split('\n').map(row => row.split(''));
  width = original[0].length;
  height = original.length;

  function computeVisibleAsteroids(astX, astY) {
    let visibleCount = 0;
    for(let x=0;x<width; x++) {
      for(let y=0;y<height; y++) {
        if(x === astX && y === astY) continue;
        if(original[y][x] === '#') {
          let dX = astX - x,
              dY = astY - y;
          let highestLcd = 1;
          for(let lcd = 2; lcd < Math.max(height,width); lcd++) {
            if(Number.isInteger(dX/lcd) && Number.isInteger(dY/lcd)) {
              highestLcd = lcd;
            }
          }
          let slope = {x: dX/highestLcd, y: dY/highestLcd};
          let testX = x + slope.x,
              testY = y + slope.y;
          let visible = true;
          while(!(testX === astX && testY === astY)) {
            if(original[testY][testX] === '#') {
              visible = false;
              break;
            }
            testX += slope.x;
            testY += slope.y;
          }
          if(visible) visibleCount++;
        }
      }
    }

    return visibleCount;
  }

  for(let x=0;x<width; x++) {
    for(let y=0;y<height; y++) {
      if(original[y][x] === '#') {
        computed[y][x] = computeVisibleAsteroids(x,y);
      }
    }
  }

  let best = { count: 0 };
  for(let x=0;x<width; x++) {
    for(let y=0;y<height; y++) {
      if(computed[y][x] !== '.') {
        let count = computed[y][x];
        if( count > best.count ) {
          best = { x, y, count };
        }
      }
    }
  }
  return best;
}


function unitTestPartOne() {
  let result = calculateBestLocation(unit34);
  assert.equal(result.x, 3);
  assert.equal(result.y, 4);
  
  result = calculateBestLocation(unit58);
  assert.equal(result.x, 5);
  assert.equal(result.y, 8);

  result = calculateBestLocation(unit1113);
  assert.equal(result.x, 11);
  assert.equal(result.y, 13);  
}

function unitTestPartTwo() {
  assert.equal(calculateAngle(0, 1), 180);
  assert.equal(calculateAngle(1, 1), 135);
  assert.equal(calculateAngle(1, 0), 90);
  assert.equal(calculateAngle(1, -1), 45);
  assert.equal(calculateAngle(0, -1), 0);
  assert.equal(calculateAngle(-1, -1), 315);


  let result = calculate200(unit1113, 11, 13);
  assert.equal(result.x, 8);
  assert.equal(result.y, 2);
}