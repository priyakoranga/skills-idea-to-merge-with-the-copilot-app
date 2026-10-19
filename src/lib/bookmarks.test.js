import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBookmark, loadBookmarks, normalizeUrl } from './bookmarks.js';

test('normalizes URLs with and without https to the same saved value', () => {
  assert.equal(normalizeUrl('https://www.example.com'), normalizeUrl('www.example.com'));
});

test('recovers gracefully from empty, corrupted, legacy, and non-array storage values', () => {
  assert.deepEqual(loadBookmarks(null), []);
  assert.deepEqual(loadBookmarks(''), []);
  assert.deepEqual(loadBookmarks('{not json'), []);
  assert.deepEqual(loadBookmarks('"legacy bookmark"'), []);
  assert.deepEqual(loadBookmarks('{"url":"https://example.com","slug":"mona-7fk2"}'), []);
  assert.deepEqual(loadBookmarks('[{"url":"https://example.com","slug":"legacy"}]'), []);
});

test('drops malformed entries while loading saved bookmarks', () => {
  assert.deepEqual(
    loadBookmarks(JSON.stringify([
      { url: 'example.com', slug: 'mona-7fk2' },
      { url: 'javascript:alert(1)', slug: 'mona-8abc' },
      { url: 'https://example.org', slug: 42 },
      null,
    ])),
    [{ url: 'https://example.com/', slug: 'mona-7fk2' }],
  );
});

test('formats a bookmark with the exact visible separator', () => {
  assert.equal(
    formatBookmark({ url: 'https://www.example.com', slug: 'mona-7fk2' }),
    'https://www.example.com :: mona-7fk2',
  );
});
