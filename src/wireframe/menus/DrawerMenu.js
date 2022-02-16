import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { mainListItems, secondaryListItems } from './DrawerMenuListItems';

var drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    height: 600,
    marginTop: 60,
    paddingLeft: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    marginTop: 60,
    width: `calc(${theme.spacing(7)} + 1px)`,
    height: 600,
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-left',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        position: "relative",
        width: drawerWidth,
        height: 600,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        padding: theme.spacing(0, 1),
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DrawerMenu = (props) => {

    const theme = useTheme();

    return (
        <Drawer variant="permanent" open={ props.open } style={{ height: "600px"}}>
            <DrawerHeader>
                <IconButton onClick={ props.toggleDrawer }>
                    { props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Typography variant="h7" noWrap component="div" style={{ paddingLeft: 24}}>
                    Main Menu
                </Typography>
            </DrawerHeader>
            <Divider />
            <List component="nav">
                {/* for loop 돌리면서 아이콘에 toggle을 위한 onclick 이벤트를 넣어줌 */}
                { mainListItems }
                <Divider sx={{ my: 1 }} />
                { secondaryListItems }
            </List>
        </Drawer>
    )
}

export default DrawerMenu;