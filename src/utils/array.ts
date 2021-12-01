export function intersect<A extends any[], B extends any[]>(a: A, b: B): any[] {
    if (a.length === 0 || b.length === 0) {
        return [];
    }
    let long = a.length > b.length ? a : b;
    let small = a.length < b.length ? a : b;

    return long.reduce((acc, entry) => {
        if (small.includes(entry) && !acc.includes(entry)) {
            acc.push(entry);
        }
        return acc;
    }, []);
}
