// Minimal replacement for the deprecated `lodash.get`.
// Resolves dot / bracket paths such as `a.b`, `a[0].b` or `a["b"]`, and falls
// back to `defaultValue` only when the resolved value is `undefined`.
export const get = (object: any, path: string, defaultValue?: any): any => {
    if (object == null || path == null) {
        return defaultValue;
    }

    const keys =
        path in Object(object) || !/[.[]/.test(path)
            ? [path]
            : path
                  .replace(/\[["']?([^\]"']*)["']?\]/g, '.$1')
                  .split('.')
                  .filter((key) => key !== '');

    let result = object;
    for (const key of keys) {
        if (result == null) {
            return defaultValue;
        }
        result = result[key];
    }

    return result === undefined ? defaultValue : result;
};
