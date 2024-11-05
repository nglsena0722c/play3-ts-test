import Character from "./Character"
import { Equipment, UserItem } from "./Inventory"
import Item from "./Item"

const EquipmentSlot = ({ userItems }: { userItems: UserItem[] }) => {
    const equipmentList: Equipment[] = [
        'Hat', 'Hair', 'Acc', 'Eye', 'Clothes', 'Mouth', 'Cape', 'Stuffr', 'Skin', 'Stuffl', 'Hair'
    ];

    return <div className="grid grid-cols-5 grid-rows-4 gap-[10px]">
        <Item position="Hat" />
        <Character />
        {
            equipmentList.slice(1).map((position, i) => {
                const userItem = userItems.find(item => item.position === position);
                return (
                    <Item
                        key={`equip_${i}`}
                        position={position}
                        useritem={userItem}
                    />
                );
            })
        }
    </div>
}

export default EquipmentSlot