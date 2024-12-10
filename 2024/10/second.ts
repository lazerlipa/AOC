import { readFileSync } from 'fs';
console.time('execution');
const map = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split('').map(Number));
const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]
let result = 0;
map.forEach((row, i) => {
    row.forEach((cell, j) => {
        if (cell === 0) {
            walk(i, j);
        }
    });
});

function walk(i, j) {
    if (i < 0 || j < 0 || i >= map.length || j >= map[0].length) {
        return;
    }
    if (map[i][j] === 9) {
        result++;
        return;
    }
    dirs.forEach(([x, y]) => {
        if (map[i + x]?.[j + y] === map[i][j] + 1) {
            walk(i + x, j + y);
        }
    });
}
console.log(result);
console.timeEnd('execution');