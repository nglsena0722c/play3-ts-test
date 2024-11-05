import { Tap, UserItem } from "./Inventory"
import Item from "./Item"

const Slots = ({ tap, userItems, page }: { tap: Tap, userItems : UserItem[], page : number }) => {
    return <div className="grid grid-cols-5 grid-rows-3 gap-[10px]">
        {
            Array.from({ length: 15 }).map((_, i) => {
                const userItem = userItems.filter((item) => {
                    return item.slotRow !== undefined && item.slotCol !== undefined && ((item.slotRow * 5 + item.slotCol) === i)
                }) 
                return <Item key={i} tap={tap} useritem={userItem ? userItem[0] : undefined}/>
            })
        }
    </div>
}

export default Slots;