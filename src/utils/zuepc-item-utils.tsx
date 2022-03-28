import { SetStateAction } from "react";
import { ChangeableItem, ZUEPCEntityBase } from "../types/common/component.types";
import { clearObject } from "./objects-utils";

export const sortItemsToInserTotUpdateToDelete = <T extends ZUEPCEntityBase>(
    origItems: T[],
    currentItems: ChangeableItem<T>[]): [T[], T[], number[]] => {
    const itemsToInsert = currentItems.filter(x => x.item.id === undefined).map(x => x.item)
    const itemsToUpdate = currentItems.filter(x => x.item.id && x.item.id > 0 && x.changed).map(x => x.item);
    const allCurrentIds = currentItems.filter(x => x.item.id !== undefined).map(x => x.item.id);
    const itemsToDelete = origItems.filter(x => x.id !== undefined && !allCurrentIds.includes(x.id)).map(x => x.id as number);
    return [itemsToInsert, itemsToUpdate, itemsToDelete]
}

export const handleDeleteItem = <T extends object>(
    key: number,
    setItems: (value: SetStateAction<T[]>) => void): void => {
    setItems((prev) => {
        let origArray = prev.slice();
        origArray.splice(key, 1);
        return [...origArray];
    })        
}

export const handleExistingEntityItemUpdate = <T extends object>(
    key: number,
    values: T,
    setItems: (value: SetStateAction<ChangeableItem<T>[]>) => void): void => {

    if (!Object.keys(clearObject(values)).length) {
        handleDeleteItem(key, setItems);
        return;
    }
    setItems((prev) => {
        let current = prev.slice();
        let currentItem = current[key].item;
        current[key] = { item: { ...currentItem, ...values }, changed: true };
        return [...current];
    })
}


export const handleExistingEntityNewItem = <T extends object>(
    values: T,
    dirty: boolean,
    setItems: (value: SetStateAction<ChangeableItem<T>[]>) => void): void => {

    if (dirty) {
        setItems((prev) => [...prev, { item: values, changed: false }]);
    }
}

export const handleEntityNewItem = <T extends object>(
    values: T,
    dirty: boolean,
    setItems: (value: SetStateAction<T[]>) => void): void => {

    if (dirty) {
        setItems((prev) => [...prev, values]);
    }
}


export const handleEntityItemUpdate = <T extends object>(
    key: number,
    values: T,
    setItems: (value: SetStateAction<T[]>) => void): void => {

    if (!Object.keys(clearObject(values)).length) {
        handleDeleteItem(key, setItems);
        return;
    }
    setItems((prev) => {
        let current = prev.slice();
        current[key] = values;
        return [...current];
    })
}