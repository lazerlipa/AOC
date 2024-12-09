import { readFileSync } from 'fs';
console.time('execution');
const disk = readFileSync('input', 'utf-8').trim().split('').map(Number);
const files = [];
for (let i = 0; i < disk.length; i += 2) {
    for (let j = 0; j < disk[i]; j++) {
        files.push(i / 2);
    }

    for (let j = 0; j < disk[i + 1]; j++) {
        files.push('.');
    }
}
let lastIndexOfFile = files.length - 1;
files.forEach((item, i) => {
    if (item === '.') {
        for (let j = lastIndexOfFile; j > i; j--) {
            if (files[j] !== '.') {
                lastIndexOfFile = j - 1;
                files[i] = files[j];
                files[j] = '.';
                break;
            }
        }
    }
});
const result = files.reduce((acc, item, i) => {
    if (item === '.') {
        return acc;
    }
    return acc + (i * item);
}, 0);

console.log(result);
console.timeEnd('execution');