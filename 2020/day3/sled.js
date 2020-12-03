const fs = require('fs');
const assert = require('assert');

const input = fs.readFileSync('input.txt', 'utf8');

let test = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;


assert.strictEqual(countTrees(3,1,test), 7);
let result = countTrees(3,1,input);
console.log('part one', result);

let slopes = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2]
];

let results = 1;
for(let i = 0; i < slopes.length; i++) {
  let count = countTrees(slopes[i][0], slopes[i][1], input);
  results *= count;
}
console.log('part two', results);

function countTrees(xOffset,yOffset,input) {
  let rows = input.split('\n');
  let grid = rows.map(x => x.split(''));

  let treeCount = 0;

  let width = grid[0].length;

  let x = 0;
  for(let y = 0; y < rows.length; y += yOffset) {
    let space = grid[y][x%width];
    if(space === '#') treeCount++;

    x += xOffset;
  }
  return treeCount;
}