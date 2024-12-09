import { readFileSync } from 'fs';
let num = 0;
const WORD = 'XMAS';
const result = findWord(readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split('')))







console.log(result);

function findWord(grid: string[][]) {
    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            for (let direction of directions) {
                if (checkWord(grid, y, x, direction)) {
                    num++;
                }
            }
        }
    }


    return num;


}

function checkWord(grid: string[][], y: number, x: number, direction: number[]) {
    let [dy, dx] = direction;
    let word = '';
    let [ny, nx] = [y, x];
    while (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length) {
        word += grid[ny][nx];
        if (word.length === WORD.length) {
            if (word === WORD) {
                return true;
            }
            return false;
        }
        ny += dy;
        nx += dx;
    }
    return false;
}
