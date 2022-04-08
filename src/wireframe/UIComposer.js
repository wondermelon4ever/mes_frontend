import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Pane from 'react-split-pane';
import SplitPane from 'react-split-pane';
import { ThemeProvider } from '@mui/material/styles';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const UIComposer = (props) => {
    // TO-DO: size, allowResize, min, max => theme를 반영해야 함
    var theight = document.documentElement.clientHeight;
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [headerHeight, setHeaderHeight] = React.useState(60);
    const [footerHeight, setFooterHeight] = React.useState(37);
    const [bodyHeight, setBodyHeight] = React.useState(theight-headerHeight-footerHeight-3);
    const [width, setWidth] = React.useState(document.documentElement.clientWidth-3);

    React.useEffect(()=>{
        window.addEventListener("resize", (e)=>{
            theight = document.documentElement.clientHeight;
            setBodyHeight(theight-headerHeight-footerHeight-3);

            var cwidth = document.documentElement.clientWidth-3;
            setWidth(cwidth-3);
        });
    }, [])
    
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div style={{ height: "100%", width: "100%"}}>
            <BrowserRouter>
                <ThemeProvider theme={ props.curThemeInfo.theme }>
                    <SplitPane split="horizontal" allowResize={true} style={{ height: "100%", width: width }}>
                        <Pane size={ headerHeight+"px" } minSize="0px" maxSize={ headerHeight+"px" }>
                            <Header drawerOpen={ drawerOpen } toggleDrawer={ toggleDrawer } bodyHeight={ bodyHeight } { ...props } />
                        </Pane>
                        <Pane size={ bodyHeight+"px" } minSize="500px" maxSize={ bodyHeight+"px" }>
                           <Body drawerOpen={ drawerOpen } toggleDrawer={ toggleDrawer } { ...props  }/>
                        </Pane>
                        <Pane size={ footerHeight+"px" } minSize="0px" maxSize={ footerHeight+"px" }>
                            <Footer { ...props } />
                        </Pane>
                    </SplitPane>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default UIComposer;