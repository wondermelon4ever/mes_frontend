import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';

import  { addMessageCallback, removeMessageCallback } from '../../../wireframe/gmessages/pushed'
import MonEngine,{ Eventkind } from './engine/MonEngine';
import makePopupMenu from './menu/ContextPopupMenu';

class Monitor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            engine: undefined,
            themeInfo: props.curThemeInfo,
            name: props.name,
            uuid: uuidv4(),
            size: props.size,
            menushow: true,
            magnifyFlag: true,
            contextPopupMenuDiv: undefined
        }

        this.registerMonEventCallback = this.registerMonEventCallback.bind(this);
        this.registerInnerViews = this.registerInnerViews.bind(this);
        this.registerPushedMessageCallback = this.registerPushedMessageCallback.bind(this);
        this.removePushedMessageCallback = this.removePushedMessageCallback.bind(this);
        this.makeTooltipContents = this.makeTooltipContents.bind(this);
        this.showContextPopupMenu = this.showContextPopupMenu.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }

    componentDidMount() {
        console.log("Monitor component is mounted.")
        if(this.state.engine === undefined) {
            const params = {};
            params.name = this.props.name;
            params.json = this.props.json;
            params.width= this.props.size.width;
            params.height=this.props.size.height;
            params.style = this.state.themeInfo.theme;
            params.parent = document.getElementById(this.state.uuid);
           
            var mengine = new MonEngine(params);
            mengine.addEventCallback(Eventkind.load, (event)=>{
                this.registerInnerViews(mengine);
            }); 
            
            mengine.load(params.json, params.width, params.height, params.style.backgroundColor);
            this.registerMonEventCallback(mengine);
            mengine.start();
            this.registerPushedMessageCallback();

            this.setState({
                engine: mengine
            });
        }
        // document.addEventListener("contextmenu", (e) => {
        //     e.preventDefault();
        // });
    }

    componentWillUnmount() {
        console.log("Monitor will be unmounted [" + this.state.name + "]");
        if(this.state.engine !== undefined) {
            // this.state.engine.stop();
            // this.removePushedMessageCallback("");
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.curThemeInfo !== prevProps.curThemeInfo) {
            this.setState({
                themeInfo: this.props.curThemeInfo,
            });
            if(this.state.engine !== undefined) this.state.engine.applyStyle(curThemeInfo.theme);
        }

        if(this.props.size != prevProps.size) {
            this.setState({
                size: this.props.size,
            });
            if(this.state.engine !== undefined) this.state.engine.setScreenSize(size.width, size.height);
        }
    }

    
    // var notice, noticeDiv, menubar, menubarDiv;
    registerMonEventCallback (mengine) {
        mengine.addEventCallback(Eventkind.stop, (event)=>{
            console.log("Mon engine stopped!!");
        });

        mengine.addEventCallback(Eventkind.click, (event, objName, userData, objPos, coordinate)=>{
            console.log("Mouse left button clicked !!!");
            // event.preventDefault();
            // var popup = document.getElementById('popup');
            // while(popup.hasChildNodes()) {
            //     popup.removeChild(popup.firstChild);
            // }

            // engine.hideTooltipPopup();

            // if(tooltipEnable == true) {
            //     var contents = this.makeTooltipContents(objName, userData);
            //     var position = { };

            //     var rect = document.getElementById(this.props.parentName).getBoundingClientRect();
            //     position.x = ((event.clientX/1.3 - (rect.left*2)));
            //     position.y = ((event.clientY/1.3 - (rect.top *2)));
            //     engine.showTooltipPopup(position, contents);
            // }
        });

        mengine.addEventCallback(Eventkind.dblclick, (event, objName, userData, objPos, coordinate)=>{
            console.log("Mouse left buton double clicked !!!");
            // if(magnifyFlag == false) return;

            event.preventDefault();
            this.state.engine.magnify(objName);
        });

        mengine.addEventCallback(Eventkind.rightclick, (event, objName, userData, objPos, coordinate)=>{
            console.log("Mouse right button clicked !!!");
            event.preventDefault();
            this.showContextPopupMenu(event, objName, objPos, coordinate);
        });

        mengine.addEventCallback(Eventkind.mouseover, (event, objName, userData, objPos, coordinate)=>{
            console.log("Mouse over !!!");
            event.preventDefault();
            if(objName === undefined) {
            //   engine.hideTooltipPopup();
              return;
            }
            var contents = this.makeTooltipContents(objName, userData);
              var position = { };
            //   engine.hideTooltipPopup();
              var rect = document.getElementById(this.props.parentName).getBoundingClientRect();
              position.x = ((event.clientX/1.3 - (rect.left*2)));
              position.y = ((event.clientY/1.3 - (rect.top *2)));
            //   engine.showTooltipPopup(position, contents);

        });
    };

    registerInnerViews (mengine) {
        // create menubar, left, right views
        var popupdiv = document.createElement('div');
        popupdiv.id = "contextPopupMenuDiv";
        popupdiv.style.position = "absolute";
        popupdiv.style.zIndex = "110";
        popupdiv.style.opacity = 1;
        // popupdiv.style.width = "1000px";
        // popupdiv.style.height= "600px"
        popupdiv.style.top = 0;
        popupdiv.style.left= 0;

        mengine.registerInnerDiv("contextPopupMenuDiv", popupdiv);
        // var popupdiv = await mengine.createInnerDiv("contextPopupMenuDiv", style);
        this.setState({
            contextPopupMenuDiv: popupdiv
        });

        // console.log("context menu popup div id is " + popupdiv.id);

        // document.addEventListener("contextmenu", (e)=>{
        //     this.showContextPopupMenu(e, "", {}, {});
        // });
    }

    registerPushedMessageCallback () {
        return addMessageCallback("", (message) => {

        });
    };

    removePushedMessageCallback () {
        removeMessageCallback("");
    };

    makeTooltipContents (objName, userData) {

    }

    showContextPopupMenu (event, objName, objPos, coordinate) {
        var par = this.state.contextPopupMenuDiv;
        // var par = document.getElementById("temp");
        if(par.hasChildNodes()) par.removeChild(par.firstChild);

        var menudiv = document.createElement('div');
        menudiv.id = "popupmenu";
        par.appendChild(menudiv);

        makePopupMenu(objName, par.id, (e, cmd, objName)=>{
            console.log("CMD from context menu::::" + cmd + ", obj name::::" + objName);
            // on context menu command
        });
    }

    showMenu () {
        var newshow = !this.state.menushow;
        this.setState({
            menushow: newshow,
        })
    }

    render() {
        return (
            <div>
                <div style={{ height: 15 }} onClick={ this.showMenu }>{ this.state.menushow ? "숨기기" : "보이기" }</div>
                <div id="temp" style={{ height: 100, display: this.state.menushow ? "block" : "none" }}>
                
                </div>
                <div id={ this.state.uuid } style={{ width: "100%", height: "100%"}}/>
            </div>
        );
    }
}

export default Monitor;