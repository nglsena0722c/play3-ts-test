import clsx from "clsx"
import { Tap } from "./Inventory"
import Draggable from "react-draggable"

const Item = ({ position, tap }: { position?: string, tap?: Tap }) => {
    return <div className={clsx("relative border-[3px]  rounded-[16px] aspect-square flex justify-center items-center  overflow-hidden", {
        'bg-[#F6F9FF] border-[#D8E1E9] drop-shadow-[2px_2px_#D8E1E9]': (tap === 'Item') || (tap === undefined),
        'bg-[#F9FFFE] border-[#C8E9E8] drop-shadow-[2px_2px_#C8E9E8]': tap === 'Item NFT',
        'bg-[#FFF9F9] border-[#FFDEDE] drop-shadow-[2px_2px_#FFDEDE]': tap === 'Other NFT',
    })}>
        {/* <div className="z-40">
            <Draggable>
                <div onClick={() => {
                    console.log(1);
                }} className="border-1 border-black hover:cursor-pointer">Item!!</div>
            </Draggable>
        </div> */}
        <div className="z-30 absolute leading-[19px] top-[4px] left-[8px] text-fredoka font-semibold text-[16px] text-[#D8E1E9]">
            {position}
        </div>
        <div className="z-10 absolute top-0 left-0 border-white border-t-4 border-l-4 w-full h-full rounded-[13px]" />
        <div className={clsx("z-20 absolute top-[4px] left-[4px] w-[calc(100%-4px)] h-[calc(100%-4px)]  rounded-tl-[13px] rounded-br-[13px]", {
            'bg-[#F6F9FF]': tap === ('Item' || undefined),
            'bg-[#F9FFFE]': tap === 'Item NFT',
            'bg-[#FFF9F9]': tap === 'Other NFT',
        })} />
    </div>
}

export default Item