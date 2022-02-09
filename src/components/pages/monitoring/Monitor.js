import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';

import  { addMessageCallback, removeMessageCallback } from '../../../wireframe/gmessages/pushed'
import MonEngine from './MonEngine';

const Monitor = (props) => {

    const theme = useTheme();

    const [engine, setEngine] = useState(undefined);
    const [uuid, setUuid] = useState(uuidv4());
    const [curThemeInfo, setCurThemeInfo] = useState(props.curThemeInfo);
    const [size, setSize] = useState(props.size);

    // This should be called once only after component mounted or unmounted
    useEffect(()=>{
        if(engine === undefined) {
            const params = {};
            params.name = props.name;
            params.json = props.json;
            params.width= props.size.width;
            params.height=props.size.height;
            params.style = theme;

            params.parent = document.getElementById(uuid);
            params.parent.style = {
                width: props.size.with,
                height: props.size.height
            }

            var engine = new MonEngine(params);
            setEngine(engine);
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
        setCurThemeInfo(props.curThemeInfo);
        if(engine !== undefined) engine.applyStyle(curThemeInfo.theme);
    }, [props.curThemeInfo]);

    useEffect(()=>{
        setSize(props.size);
        if(engine !== undefined) engine.setScreenSize(size.width, size.height);
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
            <div id={ uuid }/>
        </div>
    );
}

export default Monitor;