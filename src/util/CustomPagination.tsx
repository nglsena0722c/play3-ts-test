import { CSSObject, Pagination, PaginationItem, styled } from "@mui/material";
import { ReactComponent as PaginationArrow } from '../img/PaginationArrow.svg';
import _ from "lodash";

const CustomPagination = ({
    page,
    setPage,
    cssObject = {},
}:
    {
        page: number,
        setPage: React.Dispatch<React.SetStateAction<number>>,
        cssObject?: CSSObject
    }) => {
    const StyledPagination = styled(Pagination)(({ theme }) => (
        _.merge(cssObject, {
            '& .MuiPaginationItem-previousNext': {
                "& > *": {
                    width: '25px',
                    marginTop: '3px',
                    [theme.breakpoints.up("sm")]: {
                        marginTop: 0,
                        width: '32px',
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
            }
        })

    ));

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