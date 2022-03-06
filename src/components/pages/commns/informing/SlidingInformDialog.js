import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
// import { transform } from '@babel/core';

const SlidingDialog = styled('div')(({ theme, show, options }) => ({
    display: show ? "block" : "none",
    position: "fixed",
    zIndex: 10000001,
    width: 240,
    height: 150,
    right: 0,
    bottom: options.bottom,
    backgroundColor: "blue",
    opacity: 0.75,
    // transform: 'translate(-200%, 0%)',
    // transition: 'opacity 15s ease-in-out'
    // To-do: animation 효과를 주어야 함 (현재 아래 코드 안 먹고 있음)
    transitionDuration: '1.5s',
    transitionTimingFunction: 'fade-in'
    // transition: 'width 2s, height 2s, background-color 2s'
    // backgroundColor: theme.backgroundColor
    // alignItems: 'center',
    // justifyContent: 'flex-left',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
}));

const SlidingInformDialog = (props) => {
    const theme = useTheme();

    const [show, setShow] = React.useState(false);
    const [inform,setInform] = React.useState(undefined);
    
    const options = props.options;
    const num = props.num;
    const callback = props.callback;

    React.useEffect(()=>{
        setInform(props.inform); 
        if(props.inform !== undefined) setShow(true);
        else setShow(false);
    }, [props.inform]);

    const confirmed = () => {
        setShow(false);
        setInform(undefined);
        callback(num);
    }

    //@todo: 나중에 화면 꾸미는 작업을 해야 함
    return (
        <SlidingDialog theme={ theme } show={ show } options={ options } onClick={ confirmed }>
            Kind: { inform !== undefined ? inform.kind : "" } <br/>
            Title: { inform !== undefined ? inform.title: "" }, { inform !== undefined ? inform.timestamp: "" }<br/>
            Body: { inform !== undefined ? inform.body: "" }
        </SlidingDialog>
    )
};

export default SlidingInformDialog;