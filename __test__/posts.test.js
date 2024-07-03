import { expect, test } from '@jest/globals';
import { fetchPosts } from '../for-test';

test('check posts', async () => {
  const limit = 5;
  const data = await fetchPosts({ limit });
  expect(data).not.toBeNull();
  expect(data).toBeDefined();
  expect(data).toHaveProperty('count');
  expect(data).toHaveProperty('results');

  expect(data.results).toHaveLength(limit);
});
