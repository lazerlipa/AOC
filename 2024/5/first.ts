import { readFileSync } from 'fs';
let num = 0;
const [ruleText, updateText] = readFileSync('input', 'utf-8').trim().split('\n\r\n');
const rules = ruleText.split('\n').map((line) => line.trim().split('|').map(Number));
const updates = updateText.split('\n').map((line) => line.trim().split(',').map(Number));

for (const update of updates) {
    let valid = true;
    for (const rule of rules) {
        const indexOfRule0 = update.indexOf(rule[0]);
        const indexOfRule1 = update.indexOf(rule[1]);
        if (indexOfRule0 > indexOfRule1 && indexOfRule1 !== -1 && indexOfRule0 !== -1) {
            valid = false;
            break;
        }
    }
    if (valid) {
        num += update[Math.floor(update.length / 2)];
    }
}

console.log(num);



