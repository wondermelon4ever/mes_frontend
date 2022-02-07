import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function Header() {
    const theme = useTheme();
    return (
        <div style={{backgroundColor: theme.backgroundColor}}>
            Header&nbsp;&nbsp;
            <Link to="/">Home</Link>&nbsp;&nbsp;
            <Link to="/monitoring">Monitor</Link>
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