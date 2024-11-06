import { IconButton, Theme } from "@mui/material";
import { ReactComponent as Close } from '../img/Close.svg';
import { CSSProperties } from "react";

const CloseButton = ({ property, onClick }: { property:(theme: Theme) => CSSProperties , onClick: () => void }) => {
    return <IconButton
        aria-label="close"
        onClick={onClick}
        sx={(theme) => ({
            padding: '3px',
            [theme.breakpoints.up("sm")]: {
                padding: '7px',
            },
            backgroundColor: '#F87171',
            border: '2px solid #4F172F',
            borderRadius: '10px',
            filter: 'drop-shadow(1.5px 1.5px 0px #4F172F)',
            color: theme.palette.grey[500],
            "&:hover": {
                backgroundColor: "#F87171 !important", // hover 시 배경색이 변하지 않게 설정
            },
            ...property(theme),
        })}
    >
        <Close />
    </IconButton>
}

export default CloseButton;