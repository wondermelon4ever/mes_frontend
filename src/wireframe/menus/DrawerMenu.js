import * as React from 'react';

import { 
    styled, 
    useTheme 
} from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DrawerMenuList from './DrawerMenuList';
import DrawerSubMenuList from './DrawerSubMenuList';

var drawerWidth = 240;

const openedMixin = (theme, options) => ({
    width: drawerWidth,
    height: options.height,
    marginTop: 60,
    paddingLeft: 0,
    backgroundColor: theme.backgroundColor,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
const closedMixin = (theme, options) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    marginTop: 60,
    width: `calc(${theme.spacing(5)} + 1px)`,
    height: options.height,
    paddingLeft: 0,
    backgroundColor: theme.backgroundColor,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(7)} + 1px)`,
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
    ({ theme, open, options }) => ({
        position: "relative",
        width: drawerWidth,
        height: options.height,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        padding: theme.spacing(0, 1),
        backgroundColor: theme.backgroundColor,
        ...(open && {
            ...openedMixin(theme, options),
            '& .MuiDrawer-paper': openedMixin(theme, options),
        }),
        ...(!open && {
            ...closedMixin(theme, options),
            '& .MuiDrawer-paper': closedMixin(theme, options),
        }),
    }),
);

const DrawerMenu = (props) => {

    const theme = useTheme();
    const [menuName, setMenuName] = React.useState("Main Menu");
    const [selectedMenuNum, setSelectedMenuNum] = React.useState(0);

    const changeMenuSelection = (menuName, num) => {
        setMenuName(menuName);
        setSelectedMenuNum(num);
        if(props.open == false) props.toggleDrawer();
    }

    return (
        <Drawer variant="permanent" open={ props.open } style={{ height: props.bodyHeight + 60 }} options={{ height: props.bodyHeight }}>
            <DrawerHeader>
                <IconButton onClick={ props.toggleDrawer }>
                    { props.open ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                </IconButton>
                <Typography variant="h7" noWrap component="div" style={{ paddingLeft: 24}}>
                    { menuName }
                </Typography>
            </DrawerHeader>
            <Divider />
            {/* <List component="nav"> */}
                {/* for loop 돌리면서 아이콘에 toggle을 위한 onclick 이벤트를 넣어줌 */}
                {/* { mainListItems } */}
                {/* <Divider sx={{ my: 1 }} /> */}
                {/* { secondaryListItems } */}
            {/* </List> */}
            <div style={{ display: "flex", height: "100%" }}>
                <div style={{  width: 56, height: "100%", borderRight: props.open ? "1px solid #d3d3d3" : "0px" }}>
                    {/* <List component="nav"> */}
                        <DrawerMenuList menuChangeListener={ changeMenuSelection }/>
                        {/* { 
                            makeDrawerMenus(changeMenuSelection)
                        } */}
                    {/* </List> */}
                </div>
                <div style={{ backgroundColor: "white", width: (240-56), height: "100%" }}>
                    <DrawerSubMenuList selectMenuNum={ selectedMenuNum } />
                </div>
            </div>
        </Drawer>
    )
}

export default DrawerMenu;