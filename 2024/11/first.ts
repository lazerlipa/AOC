import { readFileSync } from 'fs';
console.time('execution');
let stones = readFileSync('input', 'utf-8').trim().split(' ');
const rules = (stone) => {
    if (stone === '0') {
        return ['1'];
    }
    if (stone.length % 2 === 0) {
        return [stone.slice(0, stone.length / 2), `${Number(stone.slice(stone.length / 2, stone.length))}`];
    }
    return [`${Number(stone) * 2024}`];


}

for (let i = 0; i < 25; i++) {
    stones = stones.flatMap(stone => rules(stone));

}


console.log(stones.length);
console.timeEnd('execution');