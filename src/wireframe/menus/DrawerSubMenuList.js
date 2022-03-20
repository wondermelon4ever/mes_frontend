import React from 'react';

import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';

import {
    createSubMenuGroupList
 } from './DrawerSubMenuListHelper';

function createSubMenuList(subMenuItems, open) {
    return(
        <List component="nav">
            {
                subMenuItems.map((item, index)=>{

                })
            }
        </List>
    );
}

var subMenuGroupList = undefined;

const DrawerSubMenuList = (props) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState([]);

    React.useEffect(()=>{
        applyMenuSelection(props.selectedMenuNum);
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

    if(subMenuGroupList === undefined) {
        subMenuGroupList = createSubMenuGroupList();
        applyMenuSelection(props.selectedMenuNum);
    }

    return(
        <div>
            {
                subMenuGroupList.map((subMenuItems, index) => {
                    createSubMenuList(subMenuItems, open[index]);
                })
            }
        </div>
    );
}

export default DrawerSubMenuList;