import { create } from 'zustand';
import { UserItem } from './useUserItems';

interface ItemPopup {
    open: boolean,
    item?: UserItem
}

interface UseItemPopup {
    itemPopup: ItemPopup;
    setItemPopup: (input: ItemPopup) => void;
}

const useItemPopup = create<UseItemPopup>(set => ({
    itemPopup: {
        open: false
    },
    setItemPopup: (input) => set({ itemPopup: input }),
}));

export default useItemPopup;