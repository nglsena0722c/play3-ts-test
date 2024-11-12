import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material';
import PaperComponent from '../component/PaperComponent';
import useItemPopup from '../zustand/useItemPopup';
import useUserItems from '../zustand/useUserItems';
import { TopWhiteBorder, TopWhiteShadow } from '../component/PopupTopComponent';
import CloseButton from '../component/CloseButton';
import clsx from 'clsx';
import { findEmptySlot, moveItems, switchItems } from '../util/updateUserItems';

const ItemPopupDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    overflowX: 'hidden',
    maxWidth: '400px',
    borderRadius: '20px',
    border: '2px solid #1E273E',
    boxShadow: 'none',
    filter: 'drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.6)) drop-shadow(2px 2px 0px #1E273E)',
    backgroundColor: 'rgba(148, 178, 253, 0.8)',
    margin: '20px',
  },
  '& .MuiDialogTitle-root': {
    padding: '10px 15px 15px 15px',
  }
}));

export default function ItemPopup() {
  const { itemPopup, setItemPopup } = useItemPopup();
  const { userItems, setUserItems } = useUserItems();

  if (!itemPopup.item) return <></>

  const handleClose = () => {
    itemPopup.handleClose?.();
    setItemPopup({
      open: false
    })
  }

  const handleEquipOrUnequip = () => {
    if (itemPopup.item!.isEquipped) {
      const emptySlot = findEmptySlot(userItems.filter((i) => i.tap === itemPopup.item!.tap));
      if (!emptySlot) {
        alert("인벤토리가 꽉 차있네요.")
      } else {
        moveItems({
          position: itemPopup.item!.position,
          item: itemPopup.item!
        },
          emptySlot.slotRow * 5 + emptySlot.slotCol,
          userItems,
          setUserItems,
          emptySlot.slotPage
        )
      }
    } else {
      const alreadyEquipItem = userItems.filter((i) => i.isEquipped && (i.position === itemPopup.item!.position));
      if (alreadyEquipItem.length > 0) {
        switchItems({
          position: itemPopup.item!.position,
          item: itemPopup.item!
        },
          alreadyEquipItem[0],
          userItems,
          setUserItems
        )
      } else {
        moveItems({
          position: itemPopup.item!.position,
          item: itemPopup.item!
        },
          itemPopup.item!.position,
          userItems,
          setUserItems
        )
      }
    }
    handleClose();
  }

  return <ItemPopupDialog
    PaperComponent={PaperComponent}
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={itemPopup.open}
  >
    <DialogTitle
      style={{ cursor: 'move' }}
      id="draggable-dialog-title"
      className='relative flex justify-start'>
      <span className="relative z-30 font-fredoka font-semibold text-[20px] leading-[24px] text-[#FFFFFF] popup-title-shadow ">
        {itemPopup.item.name}
      </span>
      <TopWhiteBorder />
      <TopWhiteShadow className='sm:h-[13px]' />
    </DialogTitle>
    <div className="absolute top-[10px] right-[15px] flex gap-[10px]">
      <CloseButton
        onClick={handleClose}
        property={(theme) => ({
          width: '25px',
          height: '25px',
          zIndex: 40,
          [theme.breakpoints.up("sm")]: {
            padding: '4px',
          },
          filter: 'drop-shadow(1px 1px 0px #3C120E)',
          border: '1.5px solid #3C120E',
          borderRadius: '5px',
        })} />
    </div>
    <div className="drop-shadow-[1px_1px_#1E273E] mx-[5px] rounded-[15px] bg-[#3E558D] p-[10px] flex gap-[15px]">
      <div className="w-full max-w-[100px] aspect-square drop-shadow-[1.5px_1.5px_#1E273E] border-[1.2px] border-[#1E273E] bg-[#F9FCFF] flex justify-center items-center rounded-[16px]">
        <img
          alt="useritem"
          src={itemPopup.item?.imagePath}
          className="z-40 absolute top-0 w-full h-full"
        />
        <div className="relative w-full h-full overflow-hidden rounded-[16px] border-[3.5px] border-white">
          <div className={clsx("z-10 absolute top-0 left-0 w-full h-full rounded-[13px] border-[#C3D4FF] border-t-4 border-l-4")} />
          <div className={clsx("z-20 absolute top-[4px] left-[4px] w-[calc(100%-3px)] h-[calc(100%-3px)]  rounded-tl-[8px] rounded-br-[13px] bg-white")} />
        </div>
      </div>
      <div className="flex flex-col gap-[5px] justify-start font-fredoka ">
        <span className="leading-[19.3px] text-[16px] text-[#A1FFF4] font-bold ">
          {itemPopup.item?.name}
        </span>
        <span className="leading-[19.3px] text-[16px] text-white font-semibold ">
          {itemPopup.item?.description}
        </span>
      </div>
    </div>
    <div className="my-[15px] mx-[5px] flex gap-[10px] font-fredoka leading-[19px] text-[16px] font-semibold text-white ">
      <div className={clsx("popup-taptitle-shadow rounded-[10px] border-[1.5px] border-[#1E273E] drop-shadow-[1px_1px_#1E273E] flex flex-1 justify-center py-[9.5px] items-center hover:cursor-pointer", {
        "bg-[#627FC7]": true
      })}>
        Discard
      </div>
      <div
        onClick={handleEquipOrUnequip} className={clsx("popup-taptitle-shadow rounded-[10px] border-[1.5px] border-[#1E273E] drop-shadow-[1px_1px_#1E273E] flex flex-1 justify-center py-[9.5px] items-center hover:cursor-pointer", {
          'bg-[#F87171]': itemPopup.item.isEquipped,
          'bg-[#B0FF81]': !itemPopup.item.isEquipped,
        })}
      >
        {itemPopup.item.isEquipped ? "Unequip" : "Equip"}
      </div>
    </div>
  </ItemPopupDialog>
}
