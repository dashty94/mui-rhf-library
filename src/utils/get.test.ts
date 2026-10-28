import { describe, expect, it } from 'vitest';
import { get } from './get';

describe('get', () => {
    const object = {
        a: { b: { c: 3 } },
        list: [{ id: 'first' }, { id: 'second' }],
        'dotted.key': 'literal',
        falsy: { zero: 0, empty: '', no: false, nil: null }
    };

    it('reads a top-level key', () => {
        expect(get({ value: 'x' }, 'value')).toBe('x');
    });

    it('reads nested dot paths', () => {
        expect(get(object, 'a.b.c')).toBe(3);
    });

    it('reads bracket index and quoted bracket paths', () => {
        expect(get(object, 'list[1].id')).toBe('second');
        expect(get(object, 'a["b"].c')).toBe(3);
        expect(get(object, "a['b']['c']")).toBe(3);
    });

    it('prefers a literal key that contains a dot over a nested path', () => {
        expect(get(object, 'dotted.key')).toBe('literal');
    });

    it('returns the default only when the resolved value is undefined', () => {
        expect(get(object, 'a.missing', 'fallback')).toBe('fallback');
        expect(get(object, 'a.b.c.d.e', 'fallback')).toBe('fallback');
        expect(get(object, 'falsy.zero', 'fallback')).toBe(0);
        expect(get(object, 'falsy.empty', 'fallback')).toBe('');
        expect(get(object, 'falsy.no', 'fallback')).toBe(false);
        expect(get(object, 'falsy.nil', 'fallback')).toBeNull();
    });

    it('returns the default for a null or undefined source object', () => {
        expect(get(null, 'a', 'fallback')).toBe('fallback');
        expect(get(undefined, 'a', 'fallback')).toBe('fallback');
    });

    it('returns undefined when no default is given', () => {
        expect(get(object, 'nope')).toBeUndefined();
    });

    it('reads properties of primitives', () => {
        expect(get('hello', 'length')).toBe(5);
    });
});
