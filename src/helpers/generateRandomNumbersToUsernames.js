function randomInts(quantity, max) {
    const arr = [];
    while (arr.length < quantity) {
        const candidateInt = Math.floor(Math.random() * max) + 1;
        if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
    }
    return arr;
}

module.exports = randomInts;
