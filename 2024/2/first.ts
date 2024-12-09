import { readFileSync } from 'fs';
const result = readFileSync('input', 'utf-8').split(/\n+/).reduce((acc, cur, i) => {
    const report = cur.trim().split(/\s+/).map(Number);
    acc += isValid(report);
    return acc;
}, 0);



function isValid(report: number[]): number {
    let dir;
    for (let i = 0; i < report.length - 1; i++) {
        if (i === 0) {
            dir = report[i] > report[i + 1];
        }
        if (report[i] === report[i + 1]) {
            return 0;
        }
        if (dir && report[i] < report[i + 1]) {
            return 0;
        }

        if (!dir && report[i] > report[i + 1]) {
            return 0;
        }

        if (Math.abs(report[i] - report[i + 1]) > 3) {
            return 0;
        }


    }
    return 1;
}

console.log(result);