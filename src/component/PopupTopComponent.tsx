import clsx from "clsx"

export const TopWhiteBorder = ({ className }: { className?: string }) => {
    return <div className={clsx("absolute z-10 top-0 w-full left-0 h-[25px]", className)} >
        <div className="top-white-border w-full h-full" />
    </div>
}

export const TopWhiteShadow = ({ className }: { className?: string }) => {
    return <div className={clsx("absolute z-20 top-[7px] sm:top-[8px] left-0 w-full h-[13px] sm:h-[22px] flex justify-center items-center", className)}>
        <div className="bg-[#FFFFFF]/40 w-full mx-[8.5px] rounded-[25px] h-full" />
    </div>
}