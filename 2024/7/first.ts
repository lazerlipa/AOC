import { readFileSync } from 'fs';
console.time('execution');
const lines = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim());
const result = lines.reduce((acc, line) => {
    const lineArr = line.split(':');
    const res = Number(lineArr[0].trim());
    const nums = lineArr[1].trim().split(' ').map(Number);

    if (calculate(nums, res, 0, 0)) {
        return acc + res;
    }
    return acc;

}, 0);
function calculate(nums, res, i, total) {
    if (total > res) {
        return false;
    }
    if (i === nums.length) {
        return total === res;
    }
    const num = nums[i];
    const nextIndex = i + 1;
    return calculate(nums, res, nextIndex, total + num) || calculate(nums, res, nextIndex, total * num);

}
console.log(result);
console.timeEnd('execution');