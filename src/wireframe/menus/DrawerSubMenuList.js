import React from 'react';
import { render } from 'react-dom';

import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';

import {
    createSubMenuGroupList
 } from './DrawerSubMenuListHelper';
import DrawerSubMenuItem from './DrawerSubMenuItem';

const DrawerSubMenuList = (props) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState([]);
    const [subMenuGroupList, setSubMenuGroupList] = React.useState(createSubMenuGroupList());
    const [selectedMenuNum, setSelectedMenuNum] = React.useState(props.selectedMenuNum);

    React.useEffect(()=>{
        applyMenuSelection(props.selectedMenuNum);
        setSelectedMenuNum(props.selectedMenuNum);
    }, [props.selectedMenuNum]);

    const applyMenuSelection = (selectedMenuNum) => {
        var temp = open;
        var index = 0;
        for(; index < subMenuGroupList.length; index++) {
            if(selectedMenuNum === index) temp[index] = true;
            else temp[index] = false;
        }
        setOpen(temp);
    }

    if(subMenuGroupList.length === 0) {
        setSubMenuGroupList(createSubMenuGroupList());
    }

    return(
        <div>
            <List component="nav">
            {
                subMenuGroupList[selectedMenuNum].map((item, index) => {
                    return (
                        <DrawerSubMenuItem 
                            key  ={ index }
                            type ={ item.type }
                            name ={ item.name }
                            link ={ item.link }
                            Icon ={ item.Icon }
                            items={ item.items }
                            state={ item.state }
                            open ={ open }
                        />
                    )
                })
            }
            </List>
        </div>
    );
}

export default DrawerSubMenuList;