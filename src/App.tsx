import * as React from 'react';
import Button from '@mui/material/Button';
import Inventory from './Popup/Inventory';
import useInventoryOpen from './zustand/useInventoryOpen';
import ItemPopup from './Popup/ItemPopup';

export default function App() {
  const { setInventoryOpen } = useInventoryOpen();

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={() => setInventoryOpen(true)}>
        Open Inventory
      </Button>
      <Inventory />
      <ItemPopup  />
      <div className="font-fredoka font-normal">
        test
      </div>
    </React.Fragment>
  )
}