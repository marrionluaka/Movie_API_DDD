interface Array<T> {
    sum(fn: (n: T) => any): number;
}

Array.prototype.sum = function(fn) {
    return this.reduce((acc: number, value: any) => acc += fn(value));
};