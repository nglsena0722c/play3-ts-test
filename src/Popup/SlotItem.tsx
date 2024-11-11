import clsx from "clsx"
import useItemPopup from "../zustand/useItemPopup";
import useInventoryTap from "../zustand/useInventoryTap";
import useUserItems, { Equipment, UserItem } from "../zustand/useUserItems";
import { useState } from "react";

const SlotItem = ({
    position,
    page,
    showingItem,
}: {
    position: Equipment | number,
    page: number,
    showingItem?: UserItem,
}) => {
    const { setItemPopup } = useItemPopup();
    const { inventoryTap } = useInventoryTap();
    const { userItems, setUserItems } = useUserItems();
    const [clicked, setClicked] = useState<Boolean>(false);

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

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const edgecase = [
            typeof position === "number" && !e.dataTransfer.types.includes((inventoryTap || 'Item').toString().toLowerCase()), // 아이템 속성이랑 다른 곳에 장착시키려고 할 때
            typeof position !== "number" && !e.dataTransfer.types.includes(position.toString().toLowerCase()), // 아이템 속성이랑 다른 곳에 장착시키려고 할 때
            e.dataTransfer.types.includes('equipped') && showingItem && !e.dataTransfer.types.includes(showingItem.position.toLowerCase()) // 장착이 되어 있는 아이템을, 속성이랑 다른 곳에 옮기려고 할떄
        ]

        if (edgecase.includes(true)) {
            e.dataTransfer.dropEffect = "none";
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
    }

    const itemCssCondition = showingItem ? (showingItem.tap === "Item") : (typeof position !== "number" || inventoryTap === "Item");
    const itemNftCssCondition = showingItem ? showingItem.tap === "Item NFT" : (typeof position === "number" && (inventoryTap === 'Item NFT'));
    const otherNftCssCondition = showingItem ? showingItem.tap === "Other NFT" : (typeof position === "number" && (inventoryTap === 'Other NFT'));

    return <div className="relative flex justify-center items-center aspect-square"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
        {
            showingItem &&
            <>
                <img
                    alt="useritem"
                    src={showingItem.imagePath}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData("position", position.toString());
                        e.dataTransfer.setData("useritem", JSON.stringify(showingItem));
                        // onDragOver에서 dataTransfer 데이터를 getData로 확인할 수 없기 때문에, 꼼수로 types에 집어넣었음
                        e.dataTransfer.setData(showingItem.position.toLowerCase(), showingItem.position.toLowerCase());
                        e.dataTransfer.setData(showingItem.tap.toLowerCase(), showingItem.tap.toLowerCase());
                        if (showingItem.isEquipped) {
                            e.dataTransfer.setData('equipped', 'equipped');
                        }
                    }}
                    onClick={() => {
                        setClicked(true);
                        setItemPopup({
                            open: true,
                            item: showingItem,
                            handleClose: () => { setClicked(false) }
                        })
                    }} // 팝업 띄우기
                    className="z-40 absolute top-0 w-full h-full hover:cursor-grab "
                />
            </>
        }

        <div className={clsx("relative rounded-[14px] w-full h-full overflow-hidden",
            {
                'border-[3px]': !clicked,
                'bg-[#F6F9FF] border-[#D8E1E9] drop-shadow-[2px_2px_#D8E1E9]': itemCssCondition && !clicked,
                'drop-shadow-[3px_3px_#6D8BBF] slotitem-onclicked-item': itemCssCondition && clicked,
                'bg-[#F9FFFE] border-[#C8E9E8] drop-shadow-[2px_2px_#C8E9E8]': itemNftCssCondition && !clicked,
                'drop-shadow-[3px_3px_#179DA0] bg-gradient-to-br from-[#28B4B8] to-[#FFFFFF] border-[3px] border-[#B3E2E0]': itemNftCssCondition && clicked,
                'bg-[#FFF9F9] border-[#FFDEDE] drop-shadow-[2px_2px_#FFDEDE]': otherNftCssCondition && !clicked,
                'drop-shadow-[3px_3px_#F17C7C] bg-gradient-to-br from-[#FF6D6D] to-[#FFFFFF] border-[3px] border-[#FFDEDE]': otherNftCssCondition && clicked,
            })}>
            <div className={clsx("z-30 absolute leading-[15px] top-[4px] left-[4px] sm:left-[8px] font-fredoka font-semibold text-[12px] ", {
                'text-[#D8E1E9]': (showingItem?.tap === "Item") || (showingItem === undefined),
                'text-[#C8E9E8]': showingItem?.tap === "Item NFT",
                'text-[#FFDEDE]': showingItem?.tap === "Other NFT",
            })}>
                {typeof position !== "number" && position}
            </div>
            <div className={clsx("z-10 absolute top-0 left-0 w-full h-full rounded-[13px]",
                {
                    "border-white border-t-4 border-l-4": !clicked,
                    "hidden": clicked
                })} />
            <div className={clsx("z-20 absolute top-[4px] left-[4px] w-[calc(100%-3px)] h-[calc(100%-3px)]  rounded-tl-[8px] rounded-br-[13px]",
                {
                    'bg-[#F6F9FF]': !clicked && itemCssCondition,
                    'bg-[#EBF5FF]': clicked && itemCssCondition,
                    'bg-[#F9FFFE]': itemNftCssCondition,
                    'bg-[#FFF9F9]': otherNftCssCondition,
                })} />

        </div>
    </div>
}

export default SlotItem;

const filterOutItem = (item: UserItem, target: UserItem) =>
    item.tap !== target.tap ||
    item.position !== target.position ||
    item.isEquipped !== target.isEquipped ||
    item.slotPage !== target.slotPage ||
    item.slotRow !== target.slotRow ||
    item.slotCol !== target.slotCol;
