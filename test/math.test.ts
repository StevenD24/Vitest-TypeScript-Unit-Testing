import { test, expect } from 'vitest';
import { add, calculateAverage, multiply } from '../src/math';

test('add(1, 2) -> 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('add(2, 3) -> 6', () => {
    expect(multiply(2, 3)).toBe(6);
});

test('[] -> NaN', () => {
    expect(calculateAverage([])).toBe(NaN);
});

test('[1]', () => {
    expect(calculateAverage([1])).toBe(1);
});

test('[1, 2, 3]', () => {
    expect(calculateAverage([1])).toBe(1);
});

test('[-1, 4, 3]', () => {
    expect(calculateAverage([-1, 4, 3])).toBe(2);
});

test('[-1, 4, -3]', () => {
    expect(calculateAverage([-1, 4, -3])).toBe(0);
});

