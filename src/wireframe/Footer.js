import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Pane from 'react-split-pane';
import SplitPane from 'react-split-pane';

import Copyright from './Copyright';
import BottomMenu from './menus/BottonMenu';

const Footer = (props) => {

    const theme = useTheme();

    const [bottomMenuShow, setBottomMenuShow] = React.useState(false);

    const styles = {
        footer: {
            width: '100%',
            // height: '50px',
            // lineHeight: '50px',
            // textAlign: 'center',
            background: '#ddd',
            display: 'flex',
            padding: '0px'
        },
        footerCopy: {
            float: 'left',
            color: '#333',
            fontSize: '12px',
            width: "50%",
            // display: "flex",
            // textAlign: 'center',
        },
        footerLogo: {
            float: 'right',
            paddingTop: '0px'
        }
    }

    const toggleBottomMenuShow = () => {
        console.log("Clicked on bottom menu ~~~");
        setBottomMenuShow(!bottomMenuShow);
    }

    return(
        <div style={ styles.footer }>
            <div style={{ width: "25%", marginLeft: 5 }}>
                <Box style={{ padding: 2 }}>
                    <Tooltip title="Setting" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </div>
            <div style={ styles.footerCopy }>
                <div>
                    <Copyright style={{ padding: 2 }} />
                </div>
            </div>
            <div style={{ width: "25%" }}>

            </div>
            <BottomMenu show={ bottomMenuShow } toggleBottomMenuShow={ toggleBottomMenuShow } left={ 56 } bottom={ 200 }/>
        </div>
    );
}

export default Footer;
