import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material';
import PaperComponent from '../util/PaperComponent';
import { useState } from 'react';
import clsx from 'clsx';
import CustomPagination from '../util/CustomPagination';
import CloseButton from '../util/CloseButton';
import Slots from './Slots';
import EquipmentSlot from './EquipmentSlot';
import useInventoryOpen from '../zustand/useInventoryOpen';
import useInventoryTap, { InventoryTap } from '../zustand/useInventoryTap';

const InventoryDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '100%',
        overflowX: 'hidden',
        maxWidth: '420px',
        borderRadius: '20px',
        border: '3px solid #1E273E',
        boxShadow: 'none',
        filter: 'drop-shadow(0px 2px 15px rgba(0, 0, 0, 0.35)) drop-shadow(3px 3px 0px #1E273E)',
        backgroundColor: '#94B2FD',
        margin: '20px',
    },
    '& .MuiDialogTitle-root': {
        padding: '10.5px 15px',
        [theme.breakpoints.up("sm")]: {
            padding: '12.5px 15px',
        },
    }
}));



export default function Inventory() {
    const { inventoryOpen, setInventoryOpen } = useInventoryOpen();
    const { inventoryTap, setInventoryTap } = useInventoryTap();

    const handleClose = () => {
        setInventoryOpen(false);
    }

    const [page, setPage] = useState(1);

    const pagebg = {
        'Item': '#E8F8FF',
        'Item NFT': '#E7FFFF',
        'Other NFT': '#FFF9F9',
    };
    const selectedpagebg = {
        'Item': 'linear-gradient(to bottom, #415DA0, #355091)',
        'Item NFT': '#00C0C5',
        'Other NFT': '#F97070',
    };
    const border = {
        'Item': '1.5px solid #1E273E',
        'Item NFT': '1.5px solid #1B350B',
        'Other NFT': '1.5px solid #4F172F',
    };
    const dropshadow = {
        'Item': 'drop-shadow(1px 1px 0px #1E273E)',
        'Item NFT': 'drop-shadow(1px 1px 0px #1B350B)',
        'Other NFT': 'drop-shadow(1px 1px 0px #4F172F)',
    };

    return <InventoryDialog
        PaperComponent={PaperComponent}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={inventoryOpen}
    >
        <DialogTitle
            style={{ cursor: 'move' }}
            id="draggable-dialog-title"
            className='relative flex justify-center'>
            <span className="relative z-30 font-fredoka font-semibold text-[20px] sm:text-[25px] leading-[24px] sm:leading-[30px] text-[#FFFFFF] popup-title-shadow " >
                Inventory
            </span>
            <TopWhiteBorder />
            <TopWhiteShadow />
        </DialogTitle>
        <CloseButton
            onClick={handleClose}
            property={(theme) => ({
                position: 'absolute',
                right: '15px',
                top: '10px',
                width: '25px',
                height: '25px',
                [theme.breakpoints.up("sm")]: {
                    width: '35px',
                    height: '35px',
                },
                zIndex: 40,
            })} />
        <div className="border-[#1E273E] border-[2.5px] mx-[7px] rounded-[15px] bg-[#FFFEEF] px-[12px] py-[15px] sm:p-[22px]">
            <EquipmentSlot page={page} />
        </div>
        <div className="mt-[6px] sm:mt-[12px]" />
        <div className="border-[#1E273E] border-[2.5px] mx-[7px] rounded-[15px] bg-[#FFFEEF] ">
            <div className="flex bg-gradient-to-b from-[#415DA0] to-[#355091] rounded-t-[12px] ">
                <TapSelector
                    name="Item"
                    selectCondition={inventoryTap === 'Item'}
                    onClick={() => setInventoryTap('Item')}
                />
                <TapSelector
                    name="Item NFT"
                    selectCondition={inventoryTap === 'Item NFT'}
                    onClick={() => setInventoryTap('Item NFT')}
                />
                <TapSelector
                    name="Other NFT"
                    selectCondition={inventoryTap === 'Other NFT'}
                    onClick={() => setInventoryTap('Other NFT')}
                />
            </div>
            <div className='px-[12px] py-[15px] sm:p-[22px]'>
                <Slots page={page} />
            </div>
        </div>
        <CustomPagination
            setPage={setPage}
            page={page}
            cssObject={{
                '& .MuiPaginationItem-page': {
                    border: border[inventoryTap || 'Item'],
                    backgroundColor: pagebg[inventoryTap || 'Item'],
                    filter: dropshadow[inventoryTap || 'Item'],
                },
                '& .Mui-selected': {
                    background: selectedpagebg[inventoryTap || 'Item'],
                }
            }}
        />
    </InventoryDialog>
}

const TopWhiteBorder = () => {
    return <div className="absolute z-10 top-0 w-full left-0 h-[25px] bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/0" >
        <div className="relative w-full h-full">
            <div className="absolute w-[calc(100%-6px)] h-[calc(100%-3px)] top-[3px] left-[3px] bg-[#94B2FD] rounded-t-[15px]" />
        </div>
    </div>
}

const TopWhiteShadow = () => {
    return <div className="absolute z-20 top-[7px] sm:top-[8px] left-0 w-full h-[13px] sm:h-[22px] flex justify-center items-center">
        <div className="bg-[#FFFFFF]/40 w-full mx-[8.5px] rounded-[25px] h-full" />
    </div>
}

const TapSelector = ({ name, selectCondition, onClick }: { name: InventoryTap, selectCondition: boolean, onClick: () => void }) => {
    const selectedCss = {
        'Item': 'bg-[#FFFEEF] rounded-t-[12px] shadow-[2.5px_-1px_0px_#1E273E]',
        'Item NFT': 'bg-[#FFFEEF] rounded-t-[12px] shadow-[2.5px_-1px_0px_#1E273E,-2.5px_-1px_0px_#1E273E]',
        'Other NFT': 'bg-[#FFFEEF] rounded-t-[12px] shadow-[-2.5px_-1px_0px_#1E273E]',
    };
    const notSelectedCss = {
        'Item': 'border-b-[2.5px] border-[#1E273E]',
        'Item NFT': 'border-b-[2.5px] border-[#1E273E]',
        'Other NFT': 'border-b-[2.5px] border-[#1E273E]',
    }

    return <div className={clsx("flex flex-1 justify-center items-center py-[7px] font-fredoka font-semibold text-[14px] sm:text-[18px] leading-[17px] sm:leading-[22px] text-white popup-taptitle-shadow hover:cursor-pointer", selectCondition ? selectedCss[name] : notSelectedCss[name])}
        onClick={onClick} >
        {name}
    </div >
}