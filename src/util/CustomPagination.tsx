import { Pagination, PaginationItem, styled } from "@mui/material";
import { ReactComponent as PaginationArrow } from '../img/PaginationArrow.svg';
import { Tap } from "../Popup/Inventory";

const CustomPagination = ({
    page,
    setPage,
    tap
}:
{
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    tap?: Tap
}) => {
    const pagebg = {
        'Item': '#E8F8FF',
        'Item NFT': '#E7FFFF',
        'Other NFT': '#FFF9F9',
    };
    const selectedpagebg = {
        'Item': 'linear-gradient(to bottom, #415DA0, #355091)',
        'Item NFT': '#00C0C5',
        'Other NFT': '#F97070',
    };
    const border = {
        'Item': '1.5px solid #1E273E',
        'Item NFT': '1.5px solid #1B350B',
        'Other NFT': '1.5px solid #4F172F',
    };
    const dropshadow = {
        'Item': 'drop-shadow(1px 1px 0px #1E273E)',
        'Item NFT': 'drop-shadow(1px 1px 0px #1B350B)',
        'Other NFT': 'drop-shadow(1px 1px 0px #4F172F)',
    };

    const StyledPagination = styled(Pagination)(({ theme }) => ({
        '& .MuiPaginationItem-previousNext': {
            "& > *": {
                width : '25px',
                marginTop : '3px',
                [theme.breakpoints.up("sm")]: {
                    marginTop : 0,
                    width : '32px',
                },
              },
            border: '0px',
            padding: 0,
        },
        '& .MuiPaginationItem-page': {
            fontFamily: '"Fredoka", sans-serif',
            fontOpticalSizing: 'auto',
            fontVariationSettings: `"wdth" 100`,
            fontWeight: 600,
            fontSize: '16px',
            border: border[tap || 'Item'],
            backgroundColor: pagebg[tap || 'Item'],
            filter: dropshadow[tap || 'Item'],
            borderRadius: '6px',
            margin: '0px 4px',
            minWidth: '25px',
            height: '25px',
            [theme.breakpoints.up("sm")]: {
                fontSize: '20px',
                borderRadius: '8px',
                minWidth: '35px',
                height: '35px',
            },
        },
        '& .Mui-selected': {
            color: 'white',
            background: selectedpagebg[tap || 'Item'],
        }
    }));

    return <div className="w-full flex justify-center items-center pt-[6px] sm:pt-[14.5px] pb-[10px] sm:pb-[12.5px]">
        <StyledPagination
            page={page}
            onChange={(event, page) => {
                setPage(page);
            }}
            defaultPage={1}
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