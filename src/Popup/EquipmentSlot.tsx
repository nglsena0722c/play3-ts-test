import Character from "./Character"
import { Equipment, UserItem } from "./Inventory"
import Item from "./Item"

const EquipmentSlot = ({
    page,
    userItems,
    setUserItems
}: {
    page: number,
    userItems: UserItem[],
    setUserItems: React.Dispatch<React.SetStateAction<UserItem[]>>
}) => {
    const equippedUserItem = userItems.filter((item) => item.isEquipped);
    const equipmentList: Equipment[] = [
        'Hat', 'Hair', 'Acc', 'Eye', 'Clothes', 'Mouth', 'Cape', 'Stuffr', 'Skin', 'Stuffl', 'Hair'
    ];
    const hatItem = equippedUserItem.find(item => item.position === 'Hat');
    return (
        <div className="grid grid-cols-5 grid-rows-4 gap-[8px] sm:gap-[10px]">
            <Item
                key={`Hat_0`}
                userItems={userItems}
                setUserItems={setUserItems}
                page={page}
                position="Hat"
                showingItem={hatItem}
            />
            <Character />
            {
                equipmentList.slice(1).map((position, i) => {
                    const userItem = equippedUserItem.find(item => item.position === position);
                    return (
                        <Item
                            key={`${position}_${i+1}`}
                            setUserItems={setUserItems}
                            userItems={userItems}
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