import { readFileSync } from 'fs';
const [right, left] = readFileSync('input', 'utf-8').split(/\s+/).map(Number).reduce((acc: [number[], number[]], cur, i) => {
    if (i % 2 === 0) {
        acc[0].push(cur);
    }
    else {
        acc[1].push(cur);
    }
    return acc;
}
    , [[], []]);
right.sort();
left.sort();

const result = right.reduce((acc, cur, i) => {
    return acc + Math.abs(cur - left[i]);
}, 0);

console.log(result);