
export const clearObject = <T extends object>(obj: any): T => {
    return Object
        .keys(obj)
        .reduce(((r, key) => Object.assign(r, (obj[key as keyof object] && { [key]: obj[key as keyof object] }))), {}) as T;
}

export const clearValues = <T extends object>(values: T[]): T[] => {
    return [...values.map((x: T) => {
        return clearObject<T>(x);
    })]
}