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
    const headerHeight=60, footerHeight=40;
    return (
        <div style={{ height: "100%", width: "100%"}}>
            <BrowserRouter>
                <ThemeProvider theme={ props.curThemeInfo.theme }>
                    <SplitPane split="horizontal" allowResize={true}>
                        <Pane size="60px"  minSize="0px" maxSize="60px">
                            <Header { ...props } />
                        </Pane>
                        <Pane size={ "600px" } minSize="500px" maxSize="900px">
                           <Body { ...props  }/>
                        </Pane>
                        <Pane size="40px" minSize="0px" maxSize="100px">
                            <Footer { ...props } />
                        </Pane>
                    </SplitPane>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default UIComposer;