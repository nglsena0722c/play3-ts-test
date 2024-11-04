import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, styled } from '@mui/material';
import PaperComponent from '../util/PaperComponent';
import { ReactComponent as Close } from '../img/Close.svg';

const InventoryDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(10),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialog-paper': {
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

export default function Inventory({ open, handleClose, handleItemPopupOpen }: {
    open: boolean;
    handleClose: () => void;
    handleItemPopupOpen: () => void;
}) {
    return <InventoryDialog
        PaperComponent={PaperComponent}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
    >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" className='relative flex justify-center'>
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
                width : '35px',
                height : '35px',
                padding : '7px',
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
        <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Cancel
            </Button>
            <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
        <Button onClick={handleItemPopupOpen}>Open Child Modal</Button>
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