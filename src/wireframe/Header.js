import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import HeaderMenu from './menus/HeaderMenu';
import DrawerMenu from './menus/DrawerMenu';
// import TestDrawer from './menus/Test';

export default function Header (props) {
    const theme = useTheme();
    const [ drawerOpen, setDrawerOpen ] = React.useState(true);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        // <div style={{backgroundColor: theme.backgroundColor}}>
        //     Header&nbsp;&nbsp;
        //     <Link to="/">Home</Link>&nbsp;&nbsp;
        //     <Link to="/monitoring">Monitor</Link>
        // </div>
        <div>
            <HeaderMenu open={ drawerOpen } toggleDrawer={ toggleDrawer }/>
            <DrawerMenu open={ drawerOpen } toggleDrawer={ toggleDrawer } width={ 350 }/>
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