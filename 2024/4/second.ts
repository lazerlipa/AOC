import { readFileSync } from 'fs';
const indicesOfa = {};
const WORD = 'MAS';
const result = Object.values(findWord(readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split('')))).filter((value) => value === 2).length;

console.log(result);

function findWord(grid: string[][]) {
    const directions = [
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            for (let direction of directions) {
                checkWord(grid, y, x, direction);
            }
        }
    }


    return indicesOfa;


}

function checkWord(grid: string[][], y: number, x: number, direction: number[]) {
    let [dy, dx] = direction;
    let word = '';
    let [ny, nx] = [y, x];
    let indexOfa;
    while (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length) {
        word += grid[ny][nx];
        if (grid[ny][nx] === 'A') {
            indexOfa = '' + ny + ',' + nx;
        }
        if (word.length === WORD.length) {
            if (word === WORD) {
                indicesOfa[indexOfa] = (indicesOfa[indexOfa] || 0) + 1;
                return true;
            }
            return false;
        }
        ny += dy;
        nx += dx;
    }
    return false;
}
