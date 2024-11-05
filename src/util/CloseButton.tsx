import { IconButton } from "@mui/material";
import { ReactComponent as Close } from '../img/Close.svg';

const CloseButton = ({ property, onClick }: { property: Record<string, string | number>, onClick: () => void }) => {
    return <IconButton
        aria-label="close"
        onClick={onClick}
        sx={(theme) => ({
            padding: '7px',
            backgroundColor: '#F87171',
            border: '2px solid #4F172F',
            borderRadius: '10px',
            filter: 'drop-shadow(1.5px 1.5px 0px #4F172F)',
            color: theme.palette.grey[500],
            "&:hover": {
                backgroundColor: "#F87171 !important", // hover 시 배경색이 변하지 않게 설정
            },
            ...property,
        })}
    >
        <Close />
    </IconButton>
}

export default CloseButton;