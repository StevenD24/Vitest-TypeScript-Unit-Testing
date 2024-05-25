import { test, expect } from 'vitest';
import { add, multiply } from '../src/math';

test('add(1, 2) -> 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('add(2, 3) -> 6', () => {
    expect(multiply(2, 3)).toBe(6);
});

