import { Pagination, PaginationItem, styled } from "@mui/material";
import { ReactComponent as PaginationArrow } from '../img/PaginationArrow.svg';
import { Tap } from "../Popup/Inventory";

const CustomPagination = ({ tap }: { tap?: Tap }) => {
    const pagebg = {
        'item' : '#E8F8FF',
        'itemnft' : '#E7FFFF',
        'othernft' : '#FFF9F9',
    };
    const selectedpagebg = {
        'item' : 'linear-gradient(to bottom, #415DA0, #355091)',
        'itemnft' : '#00C0C5',
        'othernft' : '#F97070',
    };
    const border = {
        'item' : '1.5px solid #1E273E',
        'itemnft' : '1.5px solid #1B350B',
        'othernft' : '1.5px solid #4F172F',
    };
    const dropshadow = {
        'item' : 'drop-shadow(1px 1px 0px #1E273E)',
        'itemnft' : 'drop-shadow(1px 1px 0px #1B350B)',
        'othernft' : 'drop-shadow(1px 1px 0px #4F172F)',
    };

    const StyledPagination = styled(Pagination)(({ theme }) => ({
        '& .MuiPaginationItem-previousNext': {
            border: '0px',
            padding: 0
        },
        '& .MuiPaginationItem-page': {
            fontFamily : '"Fredoka", sans-serif',
            fontOpticalSizing : 'auto',
            fontVariationSettings: `"wdth" 100`,
            fontWeight : 600,
            fontSize : '20px',
            border : border[tap || 'item'],
            backgroundColor : pagebg[tap || 'item'],
            filter : dropshadow[tap || 'item'],
            borderRadius: '8px',
        },
        '& .Mui-selected': {
            color : 'white',
            background : selectedpagebg[tap || 'item'],
        }
    }));

    return <div className="w-full flex justify-center items-center pt-[14.5px] pb-[12.5px]">
        <StyledPagination
            count={5}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => (
                <PaginationItem
                    slots={{ previous: PaginationArrow, next: PaginationArrowNext }}
                    {...item}
                />
            )} />
    </div>
}

export default CustomPagination;


const PaginationArrowNext = () => {
    return <PaginationArrow className="-scale-x-100" />
}