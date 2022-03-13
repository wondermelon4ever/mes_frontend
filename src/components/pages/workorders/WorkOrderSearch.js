import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../widgets/searchbar/Search';

const WorkOrderSearch = (props) => {

    const doSearch = () => {
        console.log("do search...");
    }

    return(
        <div>
            <Search onKeyPress={ doSearch }>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            &nbsp;
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                Eeeeend!!!
        </div>
    );
}

export default WorkOrderSearch;