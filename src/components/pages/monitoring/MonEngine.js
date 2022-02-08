import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

class MonEngine {

    constructor(props) {

        this.name = props.name;
        this.json = props.json;
        this.style= props.style;

        this.dom = props.parent;
        this.renderer = new THREE.WebGL1Renderer( { antialias: true, preserveDrawingBuffer: true });
        this.floader = new THREE.FileLoader();
        this.oloader = new THREE.ObjectLoader();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector3();

        this.screenFixed = false, this.turnOnTooltip = true;
        this.mouseX = 0, this.mouseY = 0;

        this.events = {
            click: [], dbclick: [], rightclick: [],
            keydown: [], keyup: [],
            mousedown: [], mouseup: [], mousemove: [], mouseover: [], mouseout: [], mousewheel: [],
            touchstart: [], touchend: [], touchmove: [],
            init: [], start: [], stop: [], resize: [],
            update: []
        }

        this.init();

        // this.addEventCallback = this.addEventCallback.bind(this);
        // this.addObject = this.addObject.bind(this);
        // this.addPreset = this.addPreset.bind(this);
        // this.blinkObject = this.blinkObject.bind(this);
        // this.captureScreenShot = this.captureScreenShot.bind(this);
        // this.changeColor = this.changeColor.bind(this);
        // this.fixScreen = this.fixScreen.bind(this);
        // this.getPresets = this.getPresets.bind(this);
        // this.hideAllObjects = this.hideAllObjects.bind(this);
        // this.hideObject = this.hideObject.bind(this);
        // this.init = this.init.bind(this);
        // this.load = this.load.bind(this);
        // this.magnify = this.magnify.bind(this);
        // this.move = this.move.bind(this);
        // this.preset = this.preset.bind(this);
        // this.showAllObjects = this.showAllObjects.bind(this);
        // this.start = this.start.bind(this);
        // this.startAnimation = this.startAnimation.bind(this);
        // this.stop = this.stop.bind(this);
        // this.stopAnimation = this.stopAnimation.bind(this);
        // this.updateUserData = this.updateUserData.bind(this);
    }

    addEventCallback = (ename, callback) => {

    }

    addObject = (objType, position) => {
        
    }

    addPreset = (name) => {

    }

    applyParent = (parentDom) => {
        this.dom = parentDom;
    }

    applyStyle = (style) => {

    }

    captureScreenShot = (options) => {
        return renderer.domElement.toDataURL();
    }

    blinkObject = (objName, options) => {

    }

    changeColor = (objName, color) => {

    }

    fixScreen = (fixed) => {

    }

    getPresets = () => {

    }

    hideAllObjects = (options) => {
        // options
        // objname, tooltip turn on/off
    }

    hideObject = (objName) => {

    }

    init = () => {

    }

    load = (json, width, height, backgroundColor = 0xffffff) => {

    }

    magnify = (objName, ratio) => {

    }

    move = (objName, position) => {

    }

    preset = (name) => {

    }

    setScreenSize = (width, height) => {

    }

    showAllObjects = (options) => {

    }

    start = () => {

    }

    startAnimation = (options) => {

    }

    stop = () => {

    }

    stopAnimation = (options) => {

    }

    updateUserData = (objName, userData) => {

    }
}

export default MonEngine;