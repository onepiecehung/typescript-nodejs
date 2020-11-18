export function randomNumberExcluded(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomNumberBothIncluded(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}