import { readFileSync } from 'fs';

const result = readFileSync('input', 'utf-8').match(/(mul\(\d+,\d+\))/g).reduce((acc, cur) => {
    const nums = cur.match(/\d+/g).map(Number);
    acc += nums[0] * nums[1];
    return acc;
}, 0);

console.log(result);