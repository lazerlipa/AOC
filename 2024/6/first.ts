import { readFileSync } from 'fs';
console.time('execution');
const room = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split(''));
let guardY = room.findIndex((row) => row.includes('^'))
let guardX = room[guardY].indexOf('^');

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const seen = new Set();
let dirIndex = 0;
while (room[guardY] && room[guardY][guardX]) {
    // console.log(room)
    if (room[guardY][guardX] === '#') {
        guardX -= directions[dirIndex][1];
        guardY -= directions[dirIndex][0];
        dirIndex = (dirIndex + 1) % 4;

    } else {
        seen.add(`${guardY},${guardX}`);
        room[guardY][guardX] = 'X';
    }
    guardY += directions[dirIndex][0];
    guardX += directions[dirIndex][1];
}
// if (guardX <= 0 || guardY <= 0 || guardY > room.length || guardX > room[0].length) {
//     break;
// }








console.log(seen.size);
console.timeEnd('execution');



