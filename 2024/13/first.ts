import { readFileSync } from 'fs';
console.time('execution');
const cache = getOrSetCache(findCheapest);
const input = readFileSync('input', 'utf-8').replace(/\D+/g, ' ').trim().split(/\s+/).map(Number);
let total = 0;
const aButtonPrice = 3;
const bButtonPrice = 1;
for (let i = 0; i < input.length; i += 6) {
    const aButton = [input[i], input[i + 1]];
    const bButton = [input[i + 2], input[i + 3]];
    const prize = [input[i + 4], input[i + 5]];

    const cheapest = findCheapest(aButton, bButton, prize);
    total += cheapest < Infinity ? cheapest : 0;

}


function findCheapest(aButton, bButton, prize, price = 0, currentCheapest = Infinity) {
    if (prize[0] < 0 || prize[1] < 0) {
        return currentCheapest;
    }
    if (price > currentCheapest) {
        return currentCheapest;
    }

    if (prize[0] === 0 && prize[1] === 0) {
        return price;
    }

    return Math.min(
        cache(aButton, bButton, [prize[0] - bButton[0], prize[1] - bButton[1]], price + bButtonPrice, currentCheapest),
        cache(aButton, bButton, [prize[0] - aButton[0], prize[1] - aButton[1]], price + aButtonPrice, currentCheapest),
    );
}

function getOrSetCache(fn) {
    const cache = new Map();
    return function (...args) {
        const key = args.join(',');
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    }
}


console.log(total);
console.timeEnd('execution');