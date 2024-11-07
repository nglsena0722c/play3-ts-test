import { create } from 'zustand';
import { InventoryTap } from './useInventoryTap';

export type Equipment = 'Hat' | 'Hair' | 'Acc' | 'Eye' | 'Clothes' | 'Mouth' | 'Cape' | 'Stuffr' | 'Skin' | 'Stuffl' | 'Hair';

export interface UserItem {
    position: Equipment;
    name: string;
    description: string;
    imagePath: string;
    tap: InventoryTap;
    isEquipped: boolean;
    slotPage?: number;
    slotRow?: number;
    slotCol?: number;
}

const flexbag: UserItem = {
    position: 'Stuffl',
    name: 'Flex Bag',
    description: 'Flex Bag with a stylish hand imprinted on it',
    imagePath: '/play3-ts-test/img/FlexBag.svg',
    tap: 'Item',
    isEquipped: true,
}
const flexbag2: UserItem = {
    position: 'Stuffr',
    name: 'Flex Bag2',
    description: 'Flex Bag2 with a stylish hand imprinted on it',
    imagePath: '/play3-ts-test/img/FlexBag2.svg',
    tap: 'Item NFT',
    isEquipped: true,
}
const hiphop: UserItem = {
    position: 'Hat',
    name: 'HipHop Cap',
    description: 'Hip hop hat with a stylish hand imprinted on it',
    imagePath: '/play3-ts-test/img/Hiphopcap.svg',
    tap: 'Item',
    isEquipped: false,
    slotPage: 1,
    slotRow: 0,
    slotCol: 1,
}
const redhiphop: UserItem = {
    position: 'Hat',
    name: 'Red HipHop Cap',
    description: 'Hip hop hat with a stylish hand imprinted on it',
    imagePath: '/play3-ts-test/img/RedHipHopcap.svg',
    tap: 'Item',
    isEquipped: false,
    slotPage: 1,
    slotRow: 1,
    slotCol: 4,
}
const sunglasses: UserItem = {
    position: 'Eye',
    name: 'Sunglass',
    description: 'Sunglass with a stylish hand imprinted on it',
    imagePath: '/play3-ts-test/img/Sunglasses.svg',
    tap: 'Item',
    isEquipped: false,
    slotPage: 1,
    slotRow: 1,
    slotCol: 2,
}
const skin: UserItem = {
    position: 'Skin',
    name: 'DefaultSkin',
    description: 'This is skin',
    imagePath: '/play3-ts-test/img/Skin.svg',
    tap: 'Other NFT',
    isEquipped: false,
    slotPage: 1,
    slotRow: 1,
    slotCol: 2,
}

interface UseUserItems {
    userItems: UserItem[];
    setUserItems: (input: UserItem[]) => void;
}

const useUserItems = create<UseUserItems>(set => ({
    userItems: [flexbag, flexbag2, hiphop, sunglasses, skin, redhiphop],
    setUserItems: (input) => set({ userItems: input }),
}));

export default useUserItems;