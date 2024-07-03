import { expect, test } from '@jest/globals';
import { calcSum, rgb } from '../for-test';
test('1+2=3', () => {
  expect(calcSum(1, 2)).toBe(3);
});
test('RGB', () => {
  expect(rgb(122, 233, 22)).toBe('rgb(122 233 22)');
});
