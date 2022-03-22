import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import {
    Collapse,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DrawerMenuItemComponent from './DrawerMenuItemComponent';

const DrawerSubMenuItem = (props) => {
    const { type, name, link, Icon, items = [], state } = props;
    const classes = useStyles();

    const isExpandable = items && items.length > 0;
    
    const [open, setOpen] = React.useState(false);

    const handleMouseMove = () => {
        setOpen(!open);
    }

    const toggleOpenClose = () => {
        setOpen(!open);
    }

    const menuItemRoot = () => {
        if(type === "Divider") return ( <Divider /> );
        return (
            <DrawerMenuItemComponent key={ name } className={ classes.menuItem } link={ link } state={ state }>
                { /* Display an icon if any */}
                {
                    !!Icon && (
                        <ListItemIcon className = { classes.menuItemIcon }>
                            <Icon fontSize='small' color="action" />
                        </ListItemIcon>
                    )
                }
                <ListItemText  
                    inset={ !Icon }
                    primary={
                        <Typography type="body2" style={{ color: '#000000', fontSize: 14 }}>{ name }</Typography>
                    }
                />
                { /* Display the expand menu if the item has children */}
                { isExpandable &&  open && <ExpandLessIcon onClick={ toggleOpenClose } fontSize='small' /> }
                { isExpandable && !open && <ExpandMoreIcon onClick={ toggleOpenClose } fontSize='small' /> }
            </DrawerMenuItemComponent>
        )
    };

    const menuItemChildren = isExpandable ? (
        <Collapse in={ open } timeout='auto' unmountOnExit>
            <Divider />
            <List component='div' disablePadding>
                {
                    items.map((item, index)=>{
                        return (
                            <DrawerSubMenuItem { ...item } key={ index } />
                        )
                    })
                }
            </List>
        </Collapse>
    ) : null;

    return (
        <div onMouseEnter={ handleMouseMove } onMouseLeave={ handleMouseMove }>
            { menuItemRoot() }
            { menuItemChildren }
        </div>
    );
}

const useStyles = makeStyles(theme =>
    createStyles({
        menuItem: {
            '&.active': {
                background: 'rgba(0, 0, 0, 0)',
                '& .MuiListItemIcon-root': {
                    color: '#fff',
                },
            },
            padding: 5
        },
        menuItemIcon: {
            color: '#97c05c'
        },
    }),
);

export default DrawerSubMenuItem;