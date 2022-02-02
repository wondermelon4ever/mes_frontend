import React from 'react';
import { useTheme } from '@mui/material/styles';

export default function Header() {
    const theme = useTheme();
    return (
        <div style={{backgroundColor: theme.backgroundColor}}>Header</div>
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