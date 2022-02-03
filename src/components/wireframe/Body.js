import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const Body = (props) => {

    const theme = useTheme();

    const handleThemeChange = (event) => {
        props.changeTheme(event.target.value);
    };

    return (
        <div style={{backgroundColor: theme.backgroundColor}}>
            <select onChange={handleThemeChange}>
                <option value="">SELECT</option>
                <option value="Default Theme">Default theme</option>
                <option value="Theme2">Theme2</option>
                <option value="Theme3">Theme3</option>
            </select>
        </div>
    );
}

export default Body;

// export default class Body extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             themes: props.themes,
//             curTheme: props.curTheme,
//             themeName: props.curTheme.themeName,
//             changeTheme: props.changeTheme 
//         }

//         this.handleThemeChange = this.handleThemeChange.bind(this);
//     }

//     handleThemeChange(event) {
//         this.setState({
//             themeName: event.target.value
//         });
//         this.state.changeTheme(event.target.value);
//     }

//     render() {
//         return (
//             <div>
//                 <select onChange={this.handleThemeChange}>
//                     <option value="">SELECT</option>
//                     <option value="Default Theme">Default theme</option>
//                     <option value="Theme2">Theme2</option>
//                 </select>
//             </div>
//         );
//     }
// }