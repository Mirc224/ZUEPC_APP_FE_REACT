import { ChangeableItem } from "../types/common/component.types";

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

export const clearChangeableItemValues = 
<T extends object>(values: ChangeableItem<T>[]): ChangeableItem<T>[] => {
    return [...values.map((x): ChangeableItem<T> => {
        return { item: clearObject<T>(x.item), changed: x.changed }
    }).filter(x => Object.keys(x.item).length)];
}