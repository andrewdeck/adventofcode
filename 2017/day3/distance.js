function distance(num) {
  let x = 0, y = 0;

  let dir = 'right';
  let maxY = 0, maxX = 0, minY = 0, minX = 0;

  for(let i=1; i<num; i++) {
    if(x>maxX) {
      maxX = x;
      dir = 'up';
    } else if(y>maxY) {
      maxY = y;
      dir = 'left';
    } else if (x<minX) {
      minX = x;
      dir = 'down';
    } else if (y<minY) {
      minY = y;
      dir = 'right';
    }

    switch(dir) {
      case 'right':
        x+=1;
        break;
      case 'up':
        y+=1;
        break;
      case 'left':
        x-=1;
        break;
      case 'down':
        y-=1;
        break;
    }
  }

  return Math.abs(x) + Math.abs(y);
}

function firstLarger(num) {
  let x = 0, y = 0;

  let dir = 'right';
  let maxY = 0, maxX = 0, minY = 0, minX = 0;
  let lastNumber = 0;

  let memory = { '0,0': 1};

  for(let i=1; lastNumber<num; i++) {
    let sum = 0;
    if(x>maxX) {
      maxX = x;
      dir = 'up';
    } else if(y>maxY) {
      maxY = y;
      dir = 'left';
    } else if (x<minX) {
      minX = x;
      dir = 'down';
    } else if (y<minY) {
      minY = y;
      dir = 'right';
    }

    switch(dir) {
      case 'right':
        x+=1;
        break;
      case 'up':
        y+=1;
        break;
      case 'left':
        x-=1;
        break;
      case 'down':
        y-=1;
        break;
    }
    if(memory[(x-1)+','+y]) sum += memory[(x-1)+','+y];
    if(memory[(x+1)+','+y]) sum += memory[(x+1)+','+y];
    if(memory[(x-1)+','+(y+1)]) sum += memory[(x-1)+','+(y+1)];
    if(memory[(x+1)+','+(y+1)]) sum += memory[(x+1)+','+(y+1)];
    if(memory[(x-1)+','+(y-1)]) sum += memory[(x-1)+','+(y-1)];
    if(memory[(x+1)+','+(y-1)]) sum += memory[(x+1)+','+(y-1)];
    if(memory[(x)+','+(y+1)]) sum += memory[(x)+','+(y+1)];
    if(memory[(x)+','+(y-1)]) sum += memory[(x)+','+(y-1)];
    memory[x+','+y] = sum;
    lastNumber = sum;
  }

  return lastNumber;
}

if (distance(1) === 0 &&
    distance(12) === 3 &&
    distance(23) === 2 &&
    distance(1024) === 31) {
  console.log('Part 1: '+ distance(325489));
} else {
  console.log('Unit tests failed');
}

console.log('Part 2: ' + firstLarger(325489));