import { create } from 'zustand';

export type InventoryTap = 'Item' | 'Item NFT' | 'Other NFT';

interface UseInventoryTap {
    inventoryTap: InventoryTap;
    setInventoryTap: (input: InventoryTap) => void;
}

const useInventoryTap = create<UseInventoryTap>(set => ({
    inventoryTap: 'Item',
    setInventoryTap: (input) => set({ inventoryTap: input }),
}));

export default useInventoryTap;