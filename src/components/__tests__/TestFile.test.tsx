import { it , expect } from 'vitest';
import { sum } from '../TestFile';

it("should sum up 1 + 2 correctly", () => {
    expect(sum(1, 2)).toBe(3)
})