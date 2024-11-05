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
            Array.from({ length: 10 }).map((_, i) => {
                const userItem = userItems.filter((item) => {
                    return item.position === equipmentList[i + 1]
                })
                return <Item key={`equip_${i}`} position={equipmentList[i + 1]} useritem={userItem ? userItem[0] : undefined} />
            })
        }
    </div>
}

export default EquipmentSlot