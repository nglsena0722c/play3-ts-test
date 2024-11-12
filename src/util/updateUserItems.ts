import { Equipment, UserItem } from "../zustand/useUserItems";

const filterOutItem = (item: UserItem, target: UserItem) =>
    item.tap !== target.tap ||
    item.position !== target.position ||
    item.isEquipped !== target.isEquipped ||
    item.slotPage !== target.slotPage ||
    item.slotRow !== target.slotRow ||
    item.slotCol !== target.slotCol;

export function findEmptySlot(list: UserItem[]) {
    const maxPage = 5;
    const maxRowCol = 4;

    for (let page = 1; page < (maxPage + 1); page++) {
        for (let row = 0; row <= maxRowCol; row++) {
            for (let col = 0; col <= maxRowCol; col++) {
                const slotExists = list.some(
                    (item) => item.slotPage === page && item.slotRow === row && item.slotCol === col
                );

                if (!slotExists) {
                    return { slotPage: page, slotRow: row, slotCol: col };
                }
            }
        }
    }

    return undefined;
}

export const switchItems = (draggedItem: {
    position: string,
    item: UserItem
}, showingItem: UserItem,
    userItems: UserItem[],
    setUserItems: (input: UserItem[]) => void
) => {
    const newDraggedItem: UserItem = {
        position: draggedItem.item.position,
        name: draggedItem.item.name,
        description: draggedItem.item.description,
        imagePath: draggedItem.item.imagePath,
        tap: draggedItem.item.tap,
        isEquipped: showingItem.isEquipped,
        slotPage: showingItem.slotPage,
        slotRow: showingItem.slotRow,
        slotCol: showingItem.slotCol,
    }
    const newExistingItem: UserItem = {
        position: showingItem.position,
        name: showingItem.name,
        description: showingItem.description,
        imagePath: showingItem.imagePath,
        tap: showingItem.tap,
        isEquipped: draggedItem.item.isEquipped,
        slotPage: draggedItem.item.slotPage,
        slotRow: draggedItem.item.slotRow,
        slotCol: draggedItem.item.slotCol,
    }

    const newItems = [...(userItems.filter((i) => (
        filterOutItem(i, draggedItem.item) && filterOutItem(i, showingItem)

    ))), newDraggedItem, newExistingItem];
    setUserItems(newItems);
}

export const moveItems = (draggedItem: {
    position: string,
    item: UserItem
},
    position: number | Equipment,
    userItems: UserItem[],
    setUserItems: (input: UserItem[]) => void,
    page?: number,
) => {
    const baseItem = {
        position: draggedItem.item.position,
        name: draggedItem.item.name,
        description: draggedItem.item.description,
        imagePath: draggedItem.item.imagePath,
        tap: draggedItem.item.tap,
    };
    const newItem: UserItem = typeof position !== 'number' ? {
        ...baseItem,
        isEquipped: true,
    } : {
        ...baseItem,
        isEquipped: false,
        slotPage: page,
        slotRow: Math.floor(position / 5),
        slotCol: position % 5,
    };

    const newItems = [...(userItems.filter((i) => (
        filterOutItem(i, draggedItem.item)
    ))), newItem];
    setUserItems(newItems);
}
