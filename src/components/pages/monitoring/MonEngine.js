import React from 'react';
import * as THREE from 'three';

class MonEngine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            json: props.json,
            name: props.name,
            style: props.style,

            renderer: new THREE.WebGL1Renderer( { antialias: true, preserveDrawingBuffer: true }),
            floader: new THREE.FileLoader(),
            oloader: new THREE.ObjectLoader(),
            raycaster: new THREE.Raycaster(),
            mouse: new THREE.Vector3()
        }

        this.addEventCallback = this.addEventCallback.bind(this);
        this.addObject = this.addObject.bind(this);
        this.addPreset = this.addPreset.bind(this);
        this.blinkObject = this.blinkObject.bind(this);
        this.captureScreenShot = this.captureScreenShot.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.fixScreen = this.fixScreen.bind(this);
        this.getPresets = this.getPresets.bind(this);
        this.hideAllObjects = this.hideAllObjects.bind(this);
        this.hideObject = this.hideObject.bind(this);
        this.init = this.init.bind(this);
        this.load = this.load.bind(this);
        this.magnify = this.magnify.bind(this);
        this.move = this.move.bind(this);
        this.preset = this.preset.bind(this);
        this.showAllObjects = this.showAllObjects.bind(this);
        this.start = this.start.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.stop = this.stop.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
    }

    componentDidMound(props) {
        this.init(props.json, props.style);
    }

    addEventCallback = (ename, callback) => {

    }

    addObject = (objType, position) => {
        
    }

    addPreset = (name) => {

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

    init = (json, style) => {

    }

    load = () => {

    }

    magnify = (objName, ratio) => {

    }

    move = (objName, position) => {

    }

    preset = (name) => {

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

    render() {
        return (
            <div />
        );
    }
}

export default MonEngine;