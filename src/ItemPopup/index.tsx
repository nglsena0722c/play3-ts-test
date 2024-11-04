import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, styled } from '@mui/material';
import PaperComponent from '../util/PaperComponent';

const ItemPopupDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(10),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ItemPopup({ open, handleClose }: {
  open: boolean;
  handleClose: () => void;
}) {
  return <ItemPopupDialog
    PaperComponent={PaperComponent}
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
  >

    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
      Subscribe
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={(theme) => ({
        position: 'absolute',
        right: 8,
        top: 8,
        color: theme.palette.grey[500],
      })}
    >
      X
    </IconButton>
    <DialogContent>
      <DialogContentText>
        ttttttttttttttttt
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={handleClose}>Subscribe</Button>
    </DialogActions>
  </ItemPopupDialog>
}
