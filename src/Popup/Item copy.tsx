const Item = ({ position }: { position?: string }) => {
    return <div className="bg-[#F6F9FF] relative border-[3px] border-[#D8E1E9] rounded-[16px] aspect-square flex justify-center items-center drop-shadow-[2px_2px_#D8E1E9] overflow-hidden">
        <div className="z-40 absolute leading-[19px] top-[4px] left-[8px] text-fredoka font-semibold text-[16px] text-[#D8E1E9]">
            {position}
        </div>
        <div className="z-10 absolute top-0 left-0 border-white border-t-4 border-l-4 w-full h-full rounded-[13px]" />
        <div className="z-20 absolute top-[4px] left-[4px] w-[calc(100%-4px)] h-[calc(100%-4px)] bg-[#F6F9FF] rounded-tl-[13px] rounded-br-[13px]" />
    </div>
}

export default Item