import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChatIcon from '@mui/icons-material/Chat';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';

import Pane from 'react-split-pane';
import SplitPane from 'react-split-pane';

import Copyright from './Copyright';
import BottomMenu from './menus/BottonMenu';
import Bookmark from './menus/Bookmark';

import SlidingInformControl from '../components/pages/commns/informing/SlidingInformControl';

const Footer = (props) => {

    const theme = useTheme();

    const [bottomMenuShow, setBottomMenuShow] = React.useState(false);
    const [inform, setInform] = React.useState(undefined);
    const [informShow, setInformShow] = React.useState(false);

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

    const addNewInformForTest = () => {
        setInform({
            kind: "Sample",
            timestamp: Date.now(),
            title: "Test inform",
            body: "This inform is jist for test"
        });
        // setInformShow(!informShow);
    }

    return(
        <div style={ styles.footer }>
            <div style={{ width: "25%", marginLeft: 5 }}>
                <Box style={{ padding: 2 }}>
                    <Tooltip title="Help" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="About" placement="top">
                        <IconButton onClick={ addNewInformForTest }>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Share" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <ShareIcon />
                        </IconButton>
                    </Tooltip> */}
                    <Bookmark />
                </Box>
                {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Bookmark />
                </Box> */}
            </div>
            <div style={ styles.footerCopy }>
                <div>
                    <Copyright style={{ padding: 2 }} />
                </div>
            </div>
            <div style={{ width: "25%", textAlign: 'right' }}>
                <Box style={{ padding: 2 }}>
                    <Tooltip title="Link" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <LinkIcon />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Filters" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <FilterAltIcon />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Messanger" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <ChatIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Setting" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Admin" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <AdminPanelSettingsIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </div>
            <BottomMenu 
                show={ bottomMenuShow } 
                toggleBottomMenuShow={ toggleBottomMenuShow } 
                right={ 0 } 
                bottom={ 45 }
            />
            <SlidingInformControl inform={inform} />
        </div>
    );
}

export default Footer;
