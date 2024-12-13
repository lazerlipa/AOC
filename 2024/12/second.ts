import { readFileSync } from 'fs';
console.time('execution');
const garden = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split(''));
const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

const seen = new Set();

let total = 0;
garden.forEach((row, i) => {
    row.forEach((cell, j) => {
        if (!seen.has(`${i},${j}`)) {
            const [area, corners] =
                walk(i, j, cell, 0, 0);
            total += area * corners;
        }
    });
});




function walk(row, col, cell, area, corners) {
    if (seen.has(`${row},${col}`) || garden[row]?.[col] !== cell) {
        return [corners, area];
    }

    seen.add(`${row},${col}`);
    area++;

    corners += getCorners(row, col, cell);

    dirs.forEach((dir) => {
        if (garden[row + dir[0]]?.[col + dir[1]] !== cell) return;
        [corners, area] = walk(row + dir[0], col + dir[1], cell, area, corners);
    });

    return [corners, area];
}

function getCorners(row, col, cell) {
    let corner = 0;
    for (let ind = 0; ind < dirs.length; ind++) {
        const dir = dirs[ind];
        const nextDir = dirs[(ind + 1) % 4];
        const current = [row + dir[0], col + dir[1]];
        const next = [row + nextDir[0], col + nextDir[1]];

        const diagonal = [
            row + (dir[0] || nextDir[0]),
            col + (dir[1] || nextDir[1])
        ];

        if (garden[current[0]]?.[current[1]] !== cell && garden[next[0]]?.[next[1]] !== cell) {
            corner++;
        }
        else if (garden[current[0]]?.[current[1]] === cell && garden[next[0]]?.[next[1]] === cell && garden[diagonal[0]]?.[diagonal[1]] !== cell) {
            corner++;
        }
    }
    return corner;
}

console.log(total);
console.timeEnd('execution');
