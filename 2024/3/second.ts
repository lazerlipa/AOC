import { readFileSync } from 'fs';
let enabled = true;
const result = readFileSync('input', 'utf-8').match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g).reduce((acc, cur) => {
    if (cur === 'do()') {
        enabled = true;
    } else if (cur === 'don\'t()') {
        enabled = false;
    } else if (enabled) {
        const nums = cur.match(/\d+/g).map(Number);
        acc += nums[0] * nums[1];
    }
    return acc;
}, 0);



console.log(result);


