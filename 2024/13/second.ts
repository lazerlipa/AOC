import { readFileSync } from 'fs';
console.time('execution');
const input = readFileSync('input', 'utf-8').replace(/\D+/g, ' ').trim().split(/\s+/).map(Number);
let total = 0;
const aButtonPrice = 3;
const bButtonPrice = 1;
for (let i = 0; i < input.length; i += 6) {
    const aButton = [input[i], input[i + 1]];
    const bButton = [input[i + 2], input[i + 3]];
    const prize = [input[i + 4] + 10000000000000, input[i + 5] + 10000000000000];
    total += findCheapest(aButton, bButton, prize);
}

// this is an implementation of an algorithm called "Simplex Method"

function findCheapest(aButton, bButton, prize) {
    const b = (prize[1] * aButton[0] - prize[0] * aButton[1]) / (bButton[1] * aButton[0] - bButton[0] * aButton[1]);

    const a = (prize[0] - bButton[0] * b) / aButton[0];

    if (a % 1 === 0 && b % 1 === 0) {
        return aButtonPrice * a + bButtonPrice * b;

    }
    return 0;
    // const D = aButton[0] * bButton[1] - aButton[1] * bButton[0];
    // const numeratorA = prize[0] * bButton[1] - prize[1] * bButton[0];
    // const numeratorB = prize[1] * aButton[0] - prize[0] * aButton[1];
    // if (numeratorA % D === 0 && numeratorB % D === 0) {
    //     const a = numeratorA / D;
    //     const b = numeratorB / D;
    //     if (a >= 0 && b >= 0) {
    //         return aButtonPrice * a + bButtonPrice * b;
    //     }
    // } else {
    //     return 0;
    // }

}



console.log(total);
console.timeEnd('execution');


