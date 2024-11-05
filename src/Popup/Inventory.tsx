import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, styled } from '@mui/material';
import PaperComponent from '../util/PaperComponent';
import { ReactComponent as Close } from '../img/Close.svg';
import Character from './Character';
import Item from './Item';
import { useState } from 'react';
import clsx from 'clsx';
import CustomPagination from '../util/CustomPagination';

const InventoryDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '100%',
        maxWidth: '529px',
        borderRadius: '20px',
        border: '3px solid #1E273E',
        boxShadow: 'none',
        filter: 'drop-shadow(0px 2px 15px rgba(0, 0, 0, 0.7)) drop-shadow(3px 3px 0px #1E273E)',
        backgroundColor: '#94B2FD'
    },
    '& .MuiDialogTitle-root': {
        padding: '14px 15px'
    }
}));

export type Tap = 'item' | 'itemnft' | 'othernft';

export default function Inventory({ open, handleClose, handleItemPopupOpen }: {
    open: boolean;
    handleClose: () => void;
    handleItemPopupOpen: () => void;
}) {

    const [tap, setTap] = useState<Tap>('item');

    return <InventoryDialog
        PaperComponent={PaperComponent}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
    >
        <DialogTitle 
        style={{ cursor: 'move' }} 
        id="draggable-dialog-title" 
        className='relative flex justify-center'>
            <span className="relative z-30 font-fredoka font-semibold text-[25px] leading-[30px] text-[#FFFFFF] popup-title-shadow " >
                Inventory
            </span>
            <TopWhiteBorder />
            <TopWhiteBg />
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
                position: 'absolute',
                right: '25px',
                top: '12px',
                width: '35px',
                height: '35px',
                padding: '7px',
                zIndex: 40,
                backgroundColor: '#F87171',
                border: '2px solid #4F172F',
                borderRadius: '10px',
                filter: 'drop-shadow(1.5px 1.5px 0px #4F172F)',
                color: theme.palette.grey[500],
                "&:hover": {
                    backgroundColor: "#F87171 !important", // hover 시 배경색이 변하지 않게 설정
                },
            })}
        >
            <Close />
        </IconButton>
        <div className="border-[#1E273E] border-[2.5px] mx-[7px] rounded-[15px] bg-[#FFFEEF] p-[25px]">
            <div className="grid grid-cols-5 grid-rows-4 gap-[10px]">
                <Item position="Hat" />
                <Character />
                <Item position="Hair" />
                <Item position="Acc" />
                <Item position="Eye" />
                <Item position="Clothes" />
                <Item position="Mouth" />
                <Item position="Cape" />
                <Item position="Stuff" />
                <Item position="Skin" />
                <Item position="Stuff" />
                <Item position="Hair" />
            </div>
        </div>
        <div className="mt-[12px]" />
        <div className="border-[#1E273E] border-[2.5px] mx-[7px] rounded-[15px] bg-[#FFFEEF] ">
            <div className="flex bg-gradient-to-b from-[#415DA0] to-[#355091] rounded-t-[12px] ">
                <div className={clsx("flex flex-1 justify-center items-center py-[10px] font-fredoka font-semibold text-[20px] text-white popup-taptitle-shadow hover:cursor-pointer", {
                    'bg-[#FFFEEF] rounded-t-[12px] shadow-[2.5px_-1px_0px_#1E273E]': tap === 'item',
                    'border-b-[2.5px] border-[#1E273E]': tap !== 'item',
                })}
                    onClick={() => setTap('item')}>
                    Item
                </div>
                <div className={clsx("flex flex-1 justify-center items-center py-[10px] font-fredoka font-semibold text-[20px] text-white popup-taptitle-shadow hover:cursor-pointer", {
                    'bg-[#FFFEEF] rounded-t-[12px] shadow-[2.5px_-1px_0px_#1E273E,-2.5px_-1px_0px_#1E273E]': tap === 'itemnft',
                    'border-b-[2.5px] border-[#1E273E]': tap !== 'itemnft',
                })}
                    onClick={() => setTap('itemnft')}>
                    Item NFT
                </div>
                <div className={clsx("flex flex-1 justify-center items-center py-[10px] font-fredoka font-semibold text-[20px] text-white popup-taptitle-shadow hover:cursor-pointer", {
                    'bg-[#FFFEEF] rounded-t-[12px] shadow-[-2.5px_-1px_0px_#1E273E]': tap === 'othernft',
                    'border-b-[2.5px] border-[#1E273E]': tap !== 'othernft',
                })}
                    onClick={() => setTap('othernft')}>
                    Other NFT
                </div>
            </div>
            <div className='p-[25px]'>
                <div className="grid grid-cols-5 grid-rows-3 gap-[10px]">
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                    <Item tap={tap}/>
                </div>
            </div>
        </div>
        <CustomPagination tap={tap} />
        {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={handleItemPopupOpen}>Open Child Modal</Button>
        </DialogActions> */}
    </InventoryDialog>
}

const TopWhiteBorder = () => {
    return <div className="absolute z-10 top-0 w-full left-0 h-[25px] bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/0" >
        <div className="relative w-full h-full">
            <div className="absolute w-[calc(100%-6px)] h-[calc(100%-3px)] top-[3px] left-[3px] bg-[#94B2FD] rounded-t-[15px]" />
        </div>
    </div>
}

const TopWhiteBg = () => {
    return <div className="absolute z-20 top-[8px] left-0 w-full h-[22px] flex justify-center items-center">
        <div className="bg-[#FFFFFF]/40 w-full mx-[8.5px] rounded-[25px] h-full" />
    </div>
}