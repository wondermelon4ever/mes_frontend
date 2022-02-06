import React from 'react';
import { useTheme } from '@mui/material/styles';

import { addRouteBySingle } from 'src/wireframe/route/BodyRouter';

var aroute = {

}

addRouteBySingle(aroute);

const Home = (props) => {

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
    )

}

export default Home;
