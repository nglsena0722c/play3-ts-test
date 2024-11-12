import * as React from 'react';
import Button from '@mui/material/Button';
import Inventory from './Popup/Inventory';
import useInventoryOpen from './zustand/useInventoryOpen';
import ItemPopup from './Popup/ItemPopup';

export default function App() {
  const { setInventoryOpen } = useInventoryOpen();

  return (
    <div className=" w-full h-[100vh] flex justify-center items-center"
      style={{
        backgroundImage: 'url("/play3-ts-test/img/bg.svg")'
      }}
    >
      <Button color="error" variant="contained" onClick={() => setInventoryOpen(true)} className="bg-red-50">
        Open Inventory
      </Button>
      <Inventory />
      <ItemPopup />
    </div >
  )
}