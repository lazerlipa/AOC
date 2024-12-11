import { readFileSync } from 'fs';
console.time('execution');
const cache = getOrSetCache(recurse);
const result = readFileSync('input', 'utf-8').trim().split(' ').map(Number).reduce((acc, curr) => {
    return acc + recurse(curr);
}, 0);

function rules(stone) {
    if (stone === 0) {
        return [1];
    }
    const stoneString = `${stone}`;
    if (stoneString.length % 2 === 0) {
        return [Number(stoneString.slice(0, stoneString.length / 2)), Number(stoneString.slice(stoneString.length / 2, stoneString.length))];
    }
    return [stone * 2024];

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
function recurse(stone, depth = 75) {
    if (depth === 0) {
        return 1;
    }
    return rules(stone).reduce((acc, next) => {
        return acc + cache(next, depth - 1);
    }, 0);

}



console.log(result);
console.timeEnd('execution');