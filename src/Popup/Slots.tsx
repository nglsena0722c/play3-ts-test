import useInventoryTap from "../zustand/useInventoryTap"
import useUserItems from "../zustand/useUserItems"
import Item from "./Item"

const Slots = ({
    page,
}: {
    page: number,
}) => {
    const { inventoryTap } = useInventoryTap();
    const { userItems  } = useUserItems();
    const userItemsinSlot = userItems.filter((item) => item.tap === inventoryTap && item.slotPage === page)
    return <div className="grid grid-cols-5 grid-rows-3 gap-[8px] sm:gap-[10px]">
        {
            Array.from({ length: 15 }).map((_, i) => {
                const userItem = userItemsinSlot.filter((item) => {
                    return item.slotRow !== undefined && item.slotCol !== undefined && ((item.slotRow * 5 + item.slotCol) === i)
                })
                return <Item
                    key={`slot_${i}`}
                    page={page}
                    position={i}
                    showingItem={userItem ? userItem[0] : undefined}
                />
            })
        }
    </div>
}

export default Slots;