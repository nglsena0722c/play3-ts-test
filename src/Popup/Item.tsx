import clsx from "clsx"
import { Equipment, Tap, UserItem } from "./Inventory"

const Item = ({
    userItems,
    setUserItems,
    position,
    page,
    tap,
    showingItem,
}: {
    userItems: UserItem[],
    setUserItems: React.Dispatch<React.SetStateAction<UserItem[]>>,
    position: Equipment | number,
    page: number,
    tap?: Tap,
    showingItem?: UserItem,
}) => {
    const switchItems = (draggedItem: {
        position: string,
        item: UserItem
    }) => {
        const newDraggedItem: UserItem = {
            position: draggedItem.item.position,
            name: draggedItem.item.name,
            description: draggedItem.item.description,
            imagePath: draggedItem.item.imagePath,
            tap: draggedItem.item.tap,
            isEquipped: showingItem!.isEquipped,
            slotPage: showingItem!.slotPage,
            slotRow: showingItem!.slotRow,
            slotCol: showingItem!.slotCol,
        }
        const newExistingItem: UserItem = {
            position: showingItem!.position,
            name: showingItem!.name,
            description: showingItem!.description,
            imagePath: showingItem!.imagePath,
            tap: showingItem!.tap,
            isEquipped: draggedItem.item.isEquipped,
            slotPage: draggedItem.item.slotPage,
            slotRow: draggedItem.item.slotRow,
            slotCol: draggedItem.item.slotCol,
        }

        const newItems = [...(userItems.filter((i) => (
            filterOutItem(i, draggedItem.item) && filterOutItem(i, showingItem!)

        ))), newDraggedItem, newExistingItem];
        setUserItems(newItems);
    }

    const moveItems = (draggedItem: {
        position: string,
        item: UserItem
    }) => {
        const baseItem = {
            position: draggedItem.item.position,
            name: draggedItem.item.name,
            description: draggedItem.item.description,
            imagePath: draggedItem.item.imagePath,
            tap: draggedItem.item.tap,
        };
        const newItem: UserItem = typeof position !== 'number' ? {
            ...baseItem,
            isEquipped: true,
        } : {
            ...baseItem,
            isEquipped: false,
            slotPage: page,
            slotRow: Math.floor(position / 5),
            slotCol: position % 5,
        };

        const newItems = [...(userItems.filter((i) => (
            filterOutItem(i, draggedItem.item)
        ))), newItem];
        setUserItems(newItems);
    }

    return <div className="relative flex justify-center items-center aspect-square"
        onDragOver={(e) => {
            e.preventDefault();
            const edgecase = [
                typeof position !== "number" && !e.dataTransfer.types.includes(position.toString().toLowerCase()), // 아이템 속성이랑 다른 곳에 장착시키려고 할 때
                e.dataTransfer.types.includes('equipped') && showingItem && !e.dataTransfer.types.includes(showingItem.position.toLowerCase()) // 장착이 되어 있는 아이템을, 속성이랑 다른 곳에 옮기려고 할떄
            ]

            if (edgecase.includes(true)) {
                e.dataTransfer.dropEffect = "none";
            }
        }}
        onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.getData("useritem")) {
                const draggedItem = {
                    position: e.dataTransfer.getData("position"),
                    item: JSON.parse(e.dataTransfer.getData("useritem")) as UserItem
                };
                if (showingItem) {
                    switchItems(draggedItem);
                } else {
                    moveItems(draggedItem);
                }
            }
        }}
    >
        {
            showingItem &&
            <img
                alt="useritem"
                src={showingItem.imagePath}
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("position", position.toString());
                    e.dataTransfer.setData("useritem", JSON.stringify(showingItem));
                    // onDragOver에서 dataTransfer 데이터를 getData로 확인할 수 없기 때문에, 꼼수로 types에 집어넣었음
                    e.dataTransfer.setData(showingItem.position.toLowerCase(), showingItem.position.toLowerCase());
                    if (showingItem.isEquipped) {
                        e.dataTransfer.setData('equipped', 'equipped');
                    }
                }}
                onClick={() => console.log('onClick')} // 팝업 띄우기
                className="z-40 absolute top-0 w-full h-full hover:cursor-grab "
            />
        }

        <div className={clsx("relative border-[3px] rounded-[16px] w-full h-full overflow-hidden", {
            'bg-[#F6F9FF] border-[#D8E1E9] drop-shadow-[2px_2px_#D8E1E9]': (tap === 'Item') || (tap === undefined),
            'bg-[#F9FFFE] border-[#C8E9E8] drop-shadow-[2px_2px_#C8E9E8]': tap === 'Item NFT',
            'bg-[#FFF9F9] border-[#FFDEDE] drop-shadow-[2px_2px_#FFDEDE]': tap === 'Other NFT',
        })}>
            <div className="z-30 absolute leading-[15px] sm:leading-[19px] top-[4px] left-[4px] sm:left-[8px] text-fredoka font-semibold text-[12px] sm:text-[16px] text-[#D8E1E9]">
                {typeof position !== "number" && position}
            </div>
            <div className="z-10 absolute top-0 left-0 border-white border-t-4 border-l-4 w-full h-full rounded-[13px]" />
            <div className={clsx("z-20 absolute top-[4px] left-[4px] w-[calc(100%-4px)] h-[calc(100%-4px)]  rounded-tl-[13px] rounded-br-[13px]", {
                'bg-[#F6F9FF]': tap === ('Item' || undefined),
                'bg-[#F9FFFE]': tap === 'Item NFT',
                'bg-[#FFF9F9]': tap === 'Other NFT',
            })} />
        </div>
    </div>
}

export default Item;

const filterOutItem = (item: UserItem, target: UserItem) =>
    item.position !== target.position ||
    item.isEquipped !== target.isEquipped ||
    item.slotPage !== target.slotPage ||
    item.slotRow !== target.slotRow ||
    item.slotCol !== target.slotCol;
