import { create } from 'zustand';

interface UseInventoryOpen {
    inventoryOpen: boolean;
    setInventoryOpen: (input: boolean) => void;
}

const useInventoryOpen = create<UseInventoryOpen>(set => ({
    inventoryOpen: false,
    setInventoryOpen: (input) => set({ inventoryOpen: input }),
}));

export default useInventoryOpen;