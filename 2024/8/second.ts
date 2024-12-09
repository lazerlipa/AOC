console.time('execution');
import { readFileSync } from 'fs';
const grid = readFileSync('input', 'utf-8').trim().split('\n').map((line) => line.trim().split(''));

const locations = grid.reduce((acc, row, i) => {
    row.forEach((cell, j) => {
        if (cell === '.') return;
        if (!acc[cell]) acc[cell] = [];
        acc[cell].push([i, j]);
    });
    return acc;
}, {});

const antinodes = new Set();

for (const node in locations) {
    const nodePositions = locations[node];
    for (let i = 0; i < nodePositions.length; i++) {
        if (nodePositions.length === 1) {
            continue;
        }
        for (let j = i + 1; j < nodePositions.length; j++) {
            let [currentX, currentY] = nodePositions[i];
            let [nextX, nextY] = nodePositions[j];
            const distanceX = currentX - nextX;
            const distanceY = currentY - nextY;
            do {
                antinodes.add(currentX + ',' + currentY);
                currentX += distanceX;
                currentY += distanceY;
            } while (grid[currentX]?.[currentY]);
            do {
                antinodes.add(nextX + ',' + nextY);
                nextX -= distanceX;
                nextY -= distanceY;
            } while (grid[nextX]?.[nextY]);
        }
    }
}

console.log(antinodes.size);
console.timeEnd('execution');