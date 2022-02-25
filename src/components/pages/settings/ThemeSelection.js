import React from 'react';
import { useTheme } from '@mui/material/styles';

const ThemeSelection = (props) => {

    const theme = useTheme();

    const handleThemeChange = (event) => {
        props.changeTheme(event.target.value);
    };

    return (
        <div style={{backgroundColor: theme.backgroundColor, width: "100%", marginTop: 20, textAlign: "center"}}>
            <select onChange={handleThemeChange}>
                <option value="">SELECT</option>
                <option value="Default Theme">Default theme</option>
                <option value="Theme2">Theme2</option>
                <option value="Theme3">Theme3</option>
            </select>
        </div>
    )
}

export default ThemeSelection;