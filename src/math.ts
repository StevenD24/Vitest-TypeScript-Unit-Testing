export function add(n1: number, n2: number) : number {
    return n1 + n2;
}

export function multiply(n1: number, n2: number) : number {
    return n1 * n2;
}

export function calculateAverage(grades: number[]): number {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }

    return sum/grades.length;
}

