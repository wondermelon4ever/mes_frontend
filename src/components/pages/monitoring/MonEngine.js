import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

import { CSS2DObject, CSS2DRenderer } from '../../widgets/three/renderer/CSS2DRenderer';
import { createDiv } from './MonEngineHelper';

class MonEngine {

    constructor(props) {

        this.name = props.name;
        this.json = props.json;
        this.style= props.style;
        this.width = 1000, this.height = 700;

        this.parent = props.parent;
        this.dom = undefined;
        this.renderer = new THREE.WebGL1Renderer( 
            { 
                antialias: true, 
                preserveDrawingBuffer: true,
            }
        );
        this.labelRenderer = new CSS2DRenderer();
        this.floader = new THREE.FileLoader();
        this.oloader = new THREE.ObjectLoader();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector3();

        this.screenFixed = false, this.turnOnTooltip = true;
        this.mouseX = 0, this.mouseY = 0;
        this.mousedown = false, this.mouseRightDown = false;

        this.camera = undefined;
        this.scene = undefined;
        this.controls = undefined;

        this.events = {
            click: [], dbclick: [], rightclick: [],
            keydown: [], keyup: [],
            mousedown: [], mouseup: [], mousemove: [], mouseover: [], mouseout: [], mousewheel: [],
            touchstart: [], touchend: [], touchmove: [],
            init: [], start: [], stop: [], resize: [],
            update: []
        }

        this.prevTime = undefined;

        // this.init(this.json, this.style.backgroundColor);

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

    //======== private functions ========
    _dispatch(array, event) {
        if(array.length > 0) {
            for(var i = 0; i < array.length; i++) {
                array[i](event);
            }
        }
    }

    _dispose () {
        while(this.dom.children.length) this.dom.removeChild(dom.firstChild);
        
        this.renderer.dispose();
        this.labelRenderer.dispose();
        this.camera = undefined;
        this.scene = undefined;
        this.renderer = undefined;
        this.labelRenderer =  undefined;
    }

    _getIntersects (event) {
        var rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clickX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        return this.raycaster.intersectObjects(this.scene.children, true);
    }

    _handleEvent (event, eventkind, intersects) {
        if(eventkind === undefined || eventkind === null) return;
        eventkind.forEach((callback)=>{
            try {
                var object =  undefined, objName = undefined, userData = undefined;
                var objPos = { x: "", y: "", z: "" }, coordinate = { x: "", y: "", x: "" };
                if(intersects != null && intersects !== undefined) {
                    object = intersects[0].object;

                    if(object != undefined) {
                        objPos.x = object.position.x, objPos.y = object.position.y, objPos.x = object.position.z;
                        objName  = object.name;
                        userData = object.userData;
                    }
                    coordinate.x = intersects[0].point.x;
                    coordinate.y = intersects[0].point.y;
                    coordinate.z = intersects[0].point.z;
                }
                if(typeof callback === "function") callback(event, objName, userData, objPos, coordinate)
            } catch (e) {
                console.error((e.message || e), (e.stack || ""));
            }
        });
    }

    _init (jsonObj, backgroundColor) {
        this.renderer.setClearColor(backgroundColor, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.dom = document.createElement("div");
        this.parent.appendChild(this.dom);

        var tooltipDiv = createDiv("tooltip");
        this.dom.appendChild(tooltipDiv);

        var project = jsonObj !== undefined ? jsonObj.project : undefined;
        if(project !== undefined) {
            if(project.gammaInput) this.renderer.gammerInput = true;
            if(project.gammaOutput) this.renderer.gammaOutput= true;
            if(project.shadows) this.renderer.shadowMap.enabled = true;
            if(project.xr) this.renderer.xr.enabled = ture;
        }
        this.renderer.domElement.style.position = 'relative';

        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = 0;
        this.labelRenderer.domElement.style.pointerEvents = 'none';

        this.dom.appendChild(this.renderer.domElement);
        this.dom.appendChild(this.labelRenderer.domElement);

        // add event callback
        // disable default context menu (right click)
        this.renderer.domElement.addEventListener("contextmenu", (event)=>{
            event.preventDefault();
        }, false);

        this.renderer.domElement.addEventListener('click', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.click, intersects);
        }, false);

        this.renderer.domElement.addEventListener('dbclick', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.dbclick, intersects);
        }, false);

        this.renderer.domElement.addEventListener('contextmenu', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.rightclick, intersects);
        }, false);

        this.renderer.domElement.addEventListener('mousewheel', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.mousewheel, intersects);

            if(this.screenFixed) return;
            var fovmax = 100, fovmin = 1;
            this.camera.fov -= event.wheelDeltaY * 0.01;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.fov = Math.max(Math.min(this.camera.fov, fovmax), fovmin);
            this.camera.updateProjectionMatrix();
        }, false);

        this.renderer.domElement.addEventListener('mouseover', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.mouseover, intersects);
        }, false);

        this.renderer.domElement.addEventListener('mousemove', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.mousemove, intersects);

            if(this.screenFixed || (!this.mousedown && !this.mouseRightDown)) return;

            event.preventDefault();
            var deltaX = event.clientX - this.mouseX;
            var deltaY = event.clientY - this.mouseY;

            this.mouseX = event.clientX, this.mouseY = event.clientY;
            if(this.mousedown) this._rotateScene(deltaX, deltaY);
            else {
                this.camera.position.x = this.camera.position.x + deltaX/4;
                this.camera.position.x = this.camera.position.z + deltaY/4;
                this.camera.updateProjectionMatrix();
            }
        }, false);

        this.renderer.domElement.addEventListener('mousedown', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.mousedown, intersects);

            event.preventDefault();

            // 2 번은 wheel down 이벤트임
            if(event.button == 0) this.mousedown = true;
            else if(event.button == 2) this.mouseRightDown = true;

            // mousedown = true;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        }, false);

        this.renderer.domElement.addEventListener('mouseup', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.mouseup, intersects);

            event.preventDefault();
            this.mousedown = false;
            this.mouseRightDown = false;
        }, false);

        // set camera and scene
        this._setCamera(this.oloader.parse(jsonObj.camera));
        this._setScene(this.oloader.parse(jsonObj.scene));

        this.scene.children.forEach((object) => {
            if(object.userData !== undefined) {
                
            }
        });
        
        this._dispatch(this.events.init, arguments);
    } // end of _init

    _render() {
        try {
            this.renderer.render(this.scene, this.camera);
            this.labelRenderer.render(this.scene, this.camera);
        } catch (e) {
            console.error((e.message || e), (e.stack || ""));
        }
    }
    
    _rotateScene (deltaX, deltaY) {
        this.scene.rotation.y += deltaX / 400;
        this.scene.rotation.x += deltaY / 400;
    }

    _setCamera (value) {
        this.camera = value;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        if(this.renderer.xr.enabled) {
            this.dom.appendChild(WEBVR.createButton(renderer));
        }
    }

    _setScene (value) {
        this.scene = value;
        // this.scene.rotation.x = 0, this.scene.rotation.y = 0, this.scene.rotation.z = 0;
    }

    _setSize (width, height) {
        this.width = width;
        this.height= height;

        if(this.camera) {
            this.camera.aspect = width/height;
            this.camera.updateProjectionMatrix();
        }

        if(this.renderer) this.renderer.setSize(width, height);
        if(this.labelRenderer) this.labelRenderer.setSize(width, height);
    }

    //======== function functions ========
    addEventCallback (ename, callback) {

    }

    addObject (objType, position) {
        
    }

    addPreset (name) {

    }

    applyParent (parentDom) {
        this.parent = parentDom;
    }

    applyStyle (style) {

    }

    blinkObject (objName, options) {

    }

    captureScreenShot (options) {
        return renderer.domElement.toDataURL();
    }

    changeColor (objName, color) {

    }

    fixScreen (fixed) {

    }

    getPresets () {

    }

    getName () {
        return this.name;
    }

    hideAllObjects (options) {
        // options
        // objname, tooltip turn on/off
    }

    hideObject (objName) {

    }

    load (jsonPath, width, height, backgroundColor = 0xffffff) {
        this.floader.load(jsonPath, (text) => {
            this._init(JSON.parse(text), backgroundColor);
            this._setSize(width, height);
            // this.setSize(window.innerWidth, window.innerHeight);

            // document.body.appendChild(this.dom);
            // document.body.appendChild(this.renderer.domElement);
        });
    }

    magnify (objName, ratio) {

    }

    move (objName, position) {

    }

    preset (name) {

    }

    setScreenSize (width, height) {

    }

    showAllObjects (options) {

    }

    start () {
        this.prevTime = performance.now();
        // register event listeners

        // this.renderer.shadowMap.autoUpdate = false;
        this._dispatch(this.events.start, arguments);
        this.renderer.setAnimationLoop((time)=>{
            
            time = performance.now();

            try{
                this._dispatch(this.events.update, {
                    time: time, delta: time -  this.prevTime
                });
            } catch (e) {
                console.error( (e.message || e), (e.stack || ""));
            }
            this.update();
            this.prevTime = time;
        });
    }

    startAnimation (options) {

    }

    stop () {

    }

    stopAnimation (options) {

    }

    update () {
        this._render();
    }

    updateUserData (objName, userData) {

    }
}

export default MonEngine;