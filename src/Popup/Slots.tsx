import { Tap, UserItem } from "./Inventory"
import Item from "./Item"

const Slots = ({
    page,
    tap,
    userItems,
    setUserItems
}: {
    page : number,
    tap: Tap,
    userItems: UserItem[],
    setUserItems: React.Dispatch<React.SetStateAction<UserItem[]>>
}) => {
    const userItemsinSlot = userItems.filter((item) => item.tap === tap && item.slotPage === page)
    return <div className="grid grid-cols-5 grid-rows-3 gap-[8px] sm:gap-[10px]">
        {
            Array.from({ length: 15 }).map((_, i) => {
                const userItem = userItemsinSlot.filter((item) => {
                    return item.slotRow !== undefined && item.slotCol !== undefined && ((item.slotRow * 5 + item.slotCol) === i)
                })
                return <Item
                    key={`slot_${i}`}
                    userItems={userItems}
                    setUserItems={setUserItems}
                    page={page}
                    position={i}
                    tap={tap}
                    showingItem={userItem ? userItem[0] : undefined}
                />
            })
        }
    </div>
}

export default Slots;