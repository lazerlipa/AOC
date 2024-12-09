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
            fix(update, indexOfRule0, indexOfRule1);
        }
    }
    if (!valid) {
        num += update[Math.floor(update.length / 2)];
    }

    else {
    }
}

function fix(update) {
    const ruleSet = rules.filter((rule) => update.includes(rule[0]) && update.includes(rule[1])).sort((a, b) => a[0] - b[0]);
    if (ruleSet.length === 0) {
        return;
    }
    ruleSet.forEach((rule) => {
        const indexOfRule0 = update.indexOf(rule[0]);
        const indexOfRule1 = update.indexOf(rule[1]);
        if (indexOfRule0 > indexOfRule1) {
            const temp = update[indexOfRule0];
            update[indexOfRule0] = update[indexOfRule1];
            update[indexOfRule1] = temp;
        }
    });


}


console.log(num);



