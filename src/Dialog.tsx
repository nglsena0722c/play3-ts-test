import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Box, IconButton, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
            <Dialog
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
                < ChildModal />
            </Dialog>
        </React.Fragment>
    );
}
export default function DraggableDialog() {
    const [open, setOpen] = React.useState(false);
    const [childopen, setChildOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChildOpen = () => {
        setChildOpen(true);
    };
    const handleChildClose = () => {
        setChildOpen(false);
    };
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open draggable dialog
            </Button>
            <Dialog
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
                <Button onClick={handleChildOpen}>Open Child Modal</Button>
            </Dialog>
            <Dialog
                PaperComponent={PaperComponent}
                onClose={handleChildClose}
                aria-labelledby="customized-dialog-title"
                open={childopen}
            >

                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Subscribe
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleChildClose}
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
                    <Button autoFocus onClick={handleChildClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleChildClose}>Subscribe</Button>
                </DialogActions>
                < ChildModal />
            </Dialog>
        </React.Fragment>
    );
}
