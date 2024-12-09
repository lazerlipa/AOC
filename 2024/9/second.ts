

import { readFileSync } from 'fs';
console.time('execution');
const disk = readFileSync('input', 'utf-8').trim().split('').map(Number);
const files = [];

for (let i = 0; i < disk.length; i += 2) {
    files.push({ id: i / 2, size: disk[i], type: 'file' });
    files.push({ id: '.', size: disk[i + 1], type: 'free' });
}

for (let j = files.length - 1; j > 0; j--) {
    if (files[j].type === 'file') {
        for (let i = 0; i < j; i++) {
            if (files[i].type === 'free' && files[i].size >= files[j].size) {
                const remaining = files[i].size - files[j].size;
                const temp = files[j];
                files[j] = files[i];
                files[i] = temp;
                if (remaining > 0) {
                    files[j].size -= remaining;
                    files.splice(i + 1, 0, { id: '.', size: remaining, type: 'free' });
                }
                break;
            }
        }
    }
}
const newFiles = [];
for (let i = 0; i < files.length; i++) {
    for (let j = 0; j < files[i].size; j++) {
        newFiles.push(files[i].id);
    }
}


const result = newFiles.reduce((acc, item, i) => {
    if (item === '.') {
        return acc;
    }
    return acc + (i * item);
}, 0);

console.log(result);



console.timeEnd('execution');