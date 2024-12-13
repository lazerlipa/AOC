import { readFileSync } from 'fs';
console.time('execution');
const garden = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split(''));
const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]
const seen = new Set();
let total = 0;
garden.forEach((row, i) => {
    row.forEach((cell, j) => {
        if (!seen.has(`${i},${j}`)) {
            const [area, perimeter] = walk(i, j, cell);
            total += area * perimeter;
        }
    });
});

function walk(i, j, cell, area = 0, perimeter = 0) {
    if (garden[i]?.[j] !== cell) {
        perimeter++;
    }
    if (i < 0 || j < 0 || i >= garden.length || j >= garden[0].length || garden[i][j] !== cell || seen.has(`${i},${j}`)) {
        return [area, perimeter];
    } else {

        seen.add(`${i},${j}`);
        area++;
        const returnVal = dirs.reduce(([a, p], [dx, dy]) => {
            return walk(i + dx, j + dy, cell, a, p);
        }, [0, 0]);
        return [area + returnVal[0], perimeter + returnVal[1]];
    }


}


console.log(total);
console.timeEnd('execution');