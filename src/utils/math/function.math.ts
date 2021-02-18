export function randomNumberExcluded(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomNumberBothIncluded(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isLeapYear(year: number) {
    return new Date(year, 1, 29).getDate() === 29;
}
