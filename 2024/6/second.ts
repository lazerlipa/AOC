import { readFileSync } from 'fs';
console.time('execution');
let num = 0;
const room = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split(''));
const originalY = room.findIndex((row) => row.includes('^'))
const originalX = room[originalY].indexOf('^');
let guardY = originalY
let guardX = originalX;

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
walk(true);
console.time("part2");
for (let i = 0; i < room.length; i++) {
    for (let j = 0; j < room[i].length; j++) {
        if (room[i][j] === 'X') {
            room[i][j] = '#';
            num += walk();
            room[i][j] = 'X';
        }
    }
}



function walk(populate = false) {

    const seen = new Set();
    let dirIndex = 0;
    guardX = originalX;
    guardY = originalY;
    while (room[guardY] && room[guardY][guardX]) {
        if (populate && room[guardY][guardX] === '.') {
            room[guardY][guardX] = 'X';
        }
        if (room[guardY][guardX] === '#') {
            guardX -= directions[dirIndex][1];
            guardY -= directions[dirIndex][0];
            dirIndex = (dirIndex + 1) % 4;

        } else {
            const key = `${guardY},${guardX},${dirIndex}`;
            if (seen.has(key)) {
                return 1;
            }
            seen.add(key);
        }
        guardY += directions[dirIndex][0];
        guardX += directions[dirIndex][1];
    }
    return 0;
}
console.log(num);
console.timeEnd('execution');


