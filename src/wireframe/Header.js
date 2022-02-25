import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import HeaderMenu from './menus/HeaderMenu';
import DrawerMenu from './menus/DrawerMenu';
// import TestDrawer from './menus/Test';

export default function Header (props) {
    const theme = useTheme();

    return (
        // <div style={{backgroundColor: theme.backgroundColor}}>
        //     Header&nbsp;&nbsp;
        //     <Link to="/">Home</Link>&nbsp;&nbsp;
        //     <Link to="/monitoring">Monitor</Link>
        // </div>
        <div>
            <HeaderMenu open={ props.drawerOpen } toggleDrawer={ props.toggleDrawer }/>
            <DrawerMenu open={ props.drawerOpen } toggleDrawer={ props.toggleDrawer } width={ 350 } { ...props } />
            {/* <TestDrawer /> */}
        </div>
    );
}

// export default class Header extends React.Component {
    
//     render() {
//         const theme = useTheme();
//         return (
//             <div style={{backgroundColor: theme.backgroundColor}}>Header</div>
//         );
//     }
// }