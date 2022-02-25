import React from 'react';
import { useTheme } from '@mui/material/styles';
// import { useParam } from 'react-router-dom';

const Home = (props) => {

    const theme = useTheme();
    // // URL params 읽는 법 (match  객체)
    // // const { param } = useParam();

    // const handleThemeChange = (event) => {
    //     props.changeTheme(event.target.value);
    // };

    return (
        <div style={{ backgroundColor: theme.backgroundColor, height: 600, width: "100%" }}>
            This is home !!!
        </div>

        // <div style={{backgroundColor: theme.backgroundColor}}>
        //     <select onChange={handleThemeChange}>
        //         <option value="">SELECT</option>
        //         <option value="Default Theme">Default theme</option>
        //         <option value="Theme2">Theme2</option>
        //         <option value="Theme3">Theme3</option>
        //     </select>
        // </div>
    )

}

export default Home;
