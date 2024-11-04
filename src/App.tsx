import * as React from 'react';
import Button from '@mui/material/Button';
import Inventory from './Inventory';
import ItemPopup from './ItemPopup';

export default function DraggableDialog() {
  const [inventoryOpen, setInventoryOpen] = React.useState(false);
  const [itemPopupOpen, setItemPopupOpen] = React.useState(false);

  const handleInventoryOpen = () => {
    setInventoryOpen(true);
  };

  const handleInventoryClose = () => {
    setInventoryOpen(false);
  };
  const handleItemPopupOpen = () => {
    setItemPopupOpen(true);
  };
  const handleItemClose = () => {
    setItemPopupOpen(false);
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleInventoryOpen}>
        Open Inventory
      </Button>
      <Inventory open={inventoryOpen} handleClose={handleInventoryClose} handleItemPopupOpen={handleItemPopupOpen} />
      <ItemPopup open={itemPopupOpen} handleClose={handleItemClose} />
      <div className="font-fredoka font-normal">
        test
      </div>
    </React.Fragment>
  );
}
