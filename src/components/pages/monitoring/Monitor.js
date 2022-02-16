import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';

import  { addMessageCallback, removeMessageCallback } from '../../../wireframe/gmessages/pushed'
import MonEngine,{ Eventkind } from './engine/MonEngine';
import makePopupMenu from './inner/ContextPopupMenu';
import MonitorMenu, { onSettings } from './inner/MonitorMenu';

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
            magnifyFlag: false,
            contextPopupMenuDiv: undefined
        }

        this.registerMonEventCallback = this.registerMonEventCallback.bind(this);
        this.registerInnerViews = this.registerInnerViews.bind(this);
        this.registerPushedMessageCallback = this.registerPushedMessageCallback.bind(this);
        this.removePushedMessageCallback = this.removePushedMessageCallback.bind(this);
        this.makeTooltipContents = this.makeTooltipContents.bind(this);
        this.showContextPopupMenu = this.showContextPopupMenu.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.onContextMenuClicked = this.onContextMenuClicked.bind(this);
        this.removeContextMenu = this.removeContextMenu.bind(this);
        this.onSettingChanged = this.onSettingChanged.bind(this);

        document.addEventListener("contextmenu", e => {
            var monroot = document.getElementById("monroot");
            var rect = monroot.getBoundingClientRect();
            if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                this.removeContextMenu();
            }
        });
    }

    componentDidMount() {
        console.log("Monitor component is mounted.")
        if(this.state.engine === undefined || this.state.engine === null) {
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
            this.removeContextMenu();
        });

        mengine.addEventCallback(Eventkind.dblclick, (event, objName, userData, objPos, coordinate)=>{
            console.log("Mouse left buton double clicked !!!");
            if(this.state.magnifyFlag == false) return;

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
              var rect = document.getElementById(this.state.uuid).getBoundingClientRect();
              position.x = ((event.clientX/1.3 - (rect.left*2)));
              position.y = ((event.clientY/1.3 - (rect.top *2)));
            //   engine.showTooltipPopup(position, contents);

        });
    };

    registerInnerViews (mengine) {
        // create menubar, left, right views
        // TO-DO: apply theme
        var menudiv = document.createElement('div');
        menudiv.id = "menuDiv";
        // menudiv.style.backgroundColor = "#ffffff";
        menudiv.style.backgroundColor = this.state.themeInfo.theme.backgroundColor;
        menudiv.style.display = "block";
        menudiv.style.position = "absolute";
        menudiv.style.zIndex = "110";
        menudiv.style.opacity = 1;
        menudiv.style.top = 0;
        menudiv.style.left= 0;
        mengine.registerInnerDiv("menudiv", menudiv);

        var presets = this.state.engine.getPresets();
        menubar = <MonitorMenu 
                    presets= { presets }
                    changeListener={ this.onSettingChanged }
                    monEngine={ this.state.engine }
                    show={ this.state.menushow }
                  />;
        ReactDOM.render(menubar, menudiv);
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
        this.removeContextMenu();
        var par = document.getElementById("root");
        var menudiv = document.createElement('div');
        menudiv.id = "popupmenu";
        par.appendChild(menudiv);

        makePopupMenu(objName, menudiv.id, par.id, (e, cmd, objName)=>{
            this.onContextMenuClicked(e, cmd, objName);
            menudiv.remove();
        });
    }

    onContextMenuClicked(e, cmd, objName) {
        console.log("CMD from context menu::::" + cmd + ", obj name::::" + objName);
        switch(cmd) {
            case "showMenu" : 
                var showSetting = { kind : "SHOW", values : !this.state.menushow };
                onSettings(showSetting);
                this.setState({
                    menushow: !this.state.menushow
                });
                break;
            default:
                break;
        }
    }

    onSettingChanged(settings) {
        console.log("setting Changed =>" + settings.command + ", " + settings.value);
        var command = settings.command;
        switch(command) {
        case "FREEZE_SCREEN":
            this.state.engine.fixScreen(settings.value);
            break;
        case "PRESET_ADD":
            this.state.engine.addPreset(settings.value);
            var presets = { kind : "PRESET_LIST", values : this.state.engine.getPresets() };
            onSettings(presets);
            break;
        case "PRESET_GO" :
            if(settings.value === "Initial") this.state.engine.gotoInitialView();
            else this.state.engine.preset(settings.value);
            break;
        case "PRESET_CLEAR_ALL":
            this.state.engine.clearPresets();
            var presets = { kind : "PRESET_LIST", values : this.state.engine.getPresets() };
            onSettings(presets);
            break;
            case "PRESET_CLEAR":
                this.state.engine.clearPreset(settings.value);
                var presets = { kind : "PRESET_LIST", values : this.state.engine.getPresets() };
                onSettings(presets);
                break;
        case "CAPTURE" :
            return this.state.engine.captureSceneShot();
        case "MAGNIFY_ENABLE":
            this.setState({
                magnifyFlag: settings.value
            });
            break;
        case "OBJECT_FIND":
            this.state.engine.blink(settings.value, null, 3000);
            break;
        case "TOOLTIP_ENABLE":
            // tooltipEnable = settings.value;
            break;
        default:
            break;
        }
    }

    removeContextMenu() {
        var menudiv = document.getElementById("popupmenu");
        if(menudiv !== null && menudiv !== undefined) menudiv.remove();
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
                <div id={ this.state.uuid } style={{ width: "100%", height: "100%"}}/>
            </div>
        );
    }
}

export default Monitor;