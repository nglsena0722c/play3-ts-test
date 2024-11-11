import useUserItems, { Equipment } from "../zustand/useUserItems";
import Character from "./Character"
import SlotItem from "./SlotItem"

const EquipmentSlot = ({
    page,
}: {
    page: number,
}) => {
    const { userItems } = useUserItems();

    const equippedUserItem = userItems.filter((item) => item.isEquipped);
    const equipmentList: Equipment[] = [
        'Hat', 'Hair', 'Acc', 'Eye', 'Clothes', 'Mouth', 'Cape', 'Stuffr', 'Skin', 'Stuffl', 'Face\nDeco'
    ];
    const hatItem = equippedUserItem.find(item => item.position === 'Hat');
    return (
        <div className="grid grid-cols-5 grid-rows-4 gap-[8px] sm:gap-[9px]">
            <SlotItem
                key={`Hat_0`}
                page={page}
                position="Hat"
                showingItem={hatItem}
            />
            <Character />
            {
                equipmentList.slice(1).map((position, i) => {
                    const userItem = equippedUserItem.find(item => item.position === position);
                    return (
                        <SlotItem
                            key={`${position}_${i+1}`}
                            page={page}
                            position={position}
                            showingItem={userItem}
                        />
                    );
                })
            }
        </div>
    )
}

export default EquipmentSlot