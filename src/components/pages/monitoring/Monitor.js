import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import  { addMessageCallback, removeMessageCallback } from '../../../wireframe/gmessages/pushed'
import MonEngine from './MonEngine';

const Monitor = (props) => {

    const theme = useTheme();

    const [engine, setEngine] = useState(undefined);
    const [parent, setParent] = useState(<div style={{ width: props.size.width, height: props.size.height }}></div>);
    const [curThemeInfo, setCurThemeInfo] = useState(props.curThemeInfo);
    const [size, setSize] = useState(props.size);

    // This should be called once only after component mounted or unmounted
    useEffect(()=>{
        if(engine === undefined) {
            const params = props;
            params.parent = parent;
            params.style = theme;
            setEngine(new MonEngine(params));
            engine.load(params.json, params.width, params.height, params.style.backgroundColor);
            engine.start();
            registerMonEventCallback();
            registerPushedMessageCallback();
        } else {
            engine.stop();
            removePushedMessageCallback("");
        }
    }, []);

    useEffect(()=>{
        engine.applyStyle(curThemeInfo.theme);
        setCurThemeInfo(props.curThemeInfo);
    }, props.curThemeInfo);

    useEffect(()=>{
        setSize(props.size);
        engine.setScreenSize(size.width, size.height);
    }, [props.size]);

    const registerMonEventCallback = () => {

    };

    const registerPushedMessageCallback = () => {
        return addMessageCallback("", (message) => {

        });
    };

    const removePushedMessageCallback = () => {
        removeMessageCallback("");
    };

    return (
        <div>
            top 메뉴 -  좌측 포틀릿, 우측 포틀릿 (모두 죽이고 살리고 위치이동 가능 - 포틀릿은 메뉴로부터 활성화)
            { parent }
        </div>
    );
}

export default Monitor;