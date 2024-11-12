import clsx from "clsx"

export const TopWhiteBorder = ({ className } : {className? : string}) => {
    return <div className={clsx("absolute z-10 top-0 w-full left-0 h-[25px] bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/0", className)} >
        <div className="relative w-full h-full">
            <div className="absolute w-[calc(100%-6px)] h-[calc(100%-3px)] top-[3px] left-[3px] bg-[#7C95D3] rounded-t-[15px]" />
        </div>
    </div>
}

export const TopWhiteShadow = ({ className } : {className? : string}) => {
    return <div className={clsx("absolute z-20 top-[7px] sm:top-[8px] left-0 w-full h-[13px] sm:h-[22px] flex justify-center items-center", className)}>
        <div className="bg-[#FFFFFF]/40 w-full mx-[8.5px] rounded-[25px] h-full" />
    </div>
}