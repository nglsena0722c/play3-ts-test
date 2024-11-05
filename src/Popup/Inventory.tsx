import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material';
import PaperComponent from '../util/PaperComponent';
import Character from './Character';
import Item from './Item';
import { useState } from 'react';
import clsx from 'clsx';
import CustomPagination from '../util/CustomPagination';
import CloseButton from '../util/CloseButton';
import Slots from './Slots';

const InventoryDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '100%',
        overflowX: 'hidden',
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

export type Tap = 'Item' | 'Item NFT' | 'Other NFT';

export interface UserItem {
    position: string;
    name: string;
    description: string;
    imagePath: string;
    tap: Tap;
    isEquipped: boolean;
    slotPage?: number;
    slotRow?: number;
    slotCol?: number;
}

export default function Inventory({ open, handleClose, handleItemPopupOpen }: {
    open: boolean;
    handleClose: () => void;
    handleItemPopupOpen: () => void;
}) {
    const [tap, setTap] = useState<Tap>('Item');
    const [page, setPage] = useState(1);

    const hiphop: UserItem = {
        position: 'Hat',
        name: 'HipHop Cap',
        description: 'Hip hop hat with a stylish hand imprinted on it',
        imagePath: '/play3-ts-test/img/Hiphopcap.svg',
        tap: 'Item',
        isEquipped: false,
        slotPage: 1,
        slotRow: 0,
        slotCol: 1,
    }
    const sunglasses: UserItem = {
        position: 'Hat',
        name: 'Sunglass',
        description: 'Sunglass with a stylish hand imprinted on it',
        imagePath: '/play3-ts-test/img/Sunglasses.svg',
        tap: 'Item',
        isEquipped: false,
        slotPage: 1,
        slotRow: 1,
        slotCol: 2,
    }
    const [userItems, setUserItems] = useState<UserItem[]>([hiphop, sunglasses]);

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
            <TopWhiteShadow />
        </DialogTitle>
        <CloseButton onClick={handleClose} property={{
            position: 'absolute',
            right: '25px',
            top: '12px',
            width: '35px',
            height: '35px',
            zIndex: 40,
        }} />
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
                <TapSelector
                    name="Item"
                    selectCondition={tap === 'Item'}
                    onClick={() => setTap('Item')}
                />
                <TapSelector
                    name="Item NFT"
                    selectCondition={tap === 'Item NFT'}
                    onClick={() => setTap('Item NFT')}
                />
                <TapSelector
                    name="Other NFT"
                    selectCondition={tap === 'Other NFT'}
                    onClick={() => setTap('Other NFT')}
                />
            </div>
            <div className='p-[25px]'>
                <Slots
                    tap={tap}
                    userItems={userItems.filter((item) => item.tap === tap && item.slotPage === page)}
                    page={page}
                />
            </div>
        </div>
        <CustomPagination
            setPage={setPage}
            page={page}
            tap={tap}
        />
        {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
                <Button onClick={handleItemPopupOpen}>Open Child Modal</Button>
            </Button>
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

const TopWhiteShadow = () => {
    return <div className="absolute z-20 top-[8px] left-0 w-full h-[22px] flex justify-center items-center">
        <div className="bg-[#FFFFFF]/40 w-full mx-[8.5px] rounded-[25px] h-full" />
    </div>
}

const TapSelector = ({ name, selectCondition, onClick }: { name: Tap, selectCondition: boolean, onClick: () => void }) => {
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

    return <div className={clsx("flex flex-1 justify-center items-center py-[10px] font-fredoka font-semibold text-[20px] text-white popup-taptitle-shadow hover:cursor-pointer", selectCondition ? selectedCss[name] : notSelectedCss[name])}
        onClick={onClick} >
        {name}
    </div >
}