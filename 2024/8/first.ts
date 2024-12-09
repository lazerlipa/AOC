import { readFileSync } from 'fs';
console.time('execution');
const grid = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split(''));
const antinodes = new Set();

const locations = grid.reduce((acc, row, i) => {
    row.forEach((cell, j) => {
        if (cell === '.') return;
        if (!acc[cell]) acc[cell] = [];
        acc[cell].push([i, j]);
    });
    return acc;
}, {});

for (const node in locations) {
    const nodePositions = locations[node];

    for (let i = 0; i < nodePositions.length; i++) {
        if (nodePositions.length === 1) {
            continue;
        }
        for (let j = i + 1; j < nodePositions.length; j++) {
            const [currentX, currentY] = nodePositions[i];
            const [nextX, nextY] = nodePositions[j];
            const distanceX = currentX - nextX;
            const distanceY = currentY - nextY;
            if (grid[currentX + distanceX]?.[currentY + distanceY]) {
                antinodes.add(currentX + distanceX + ',' + (currentY + distanceY));
            }
            if (grid[nextX - distanceX]?.[nextY - distanceY]) {
                antinodes.add(nextX - distanceX + ',' + (nextY - distanceY));
            }
        }
    }
}


console.log(antinodes.size);
console.timeEnd('execution');