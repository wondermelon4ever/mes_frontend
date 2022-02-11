import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';

import { CSS2DObject, CSS2DRenderer } from '../../../widgets/three/renderer/CSS2DRenderer';
import { createDiv } from './MonEngineHelper';

OBJLoader(THREE);

class MonEngine {

    constructor(props) {

        this.name = props.name;
        this.json = props.json;
        this.style= props.style;
        this.width = 1000, this.height = 700;

        this.parent = props.parent;
        this.dom = undefined;
        this.renderer = new THREE.WebGLRenderer( 
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
            click: [], dblclick: [], rightclick: [],
            keydown: [], keyup: [],
            mousedown: [], mouseup: [], mousemove: [], mouseover: [], mouseout: [], mousewheel: [],
            touchstart: [], touchend: [], touchmove: [],
            init: [], start: [], stop: [], load: [] , resize: [],
            update: []
        }

        this.prevTime = undefined;
        this.innerViews = new Map();
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
        while(this.dom.children.length) this.dom.removeChild(this.dom.firstChild);
        
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
                // if(intersects != null && intersects !== undefined) {
                //     object = intersects[0].object;

                //     if(object !== undefined) {
                //         objPos.x = object.position.x, objPos.y = object.position.y, objPos.x = object.position.z;
                //         objName  = object.name;
                //         userData = object.userData;
                //     }
                //     coordinate.x = intersects[0].point.x;
                //     coordinate.y = intersects[0].point.y;
                //     coordinate.z = intersects[0].point.z;
                // }
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
        this.parent.style.position='relative';

        var tooltipDiv = createDiv("tooltip");
        // TO-DO: add style
        tooltipDiv.style.zIndex = 30;
        this.innerViews.set("tooltip", tooltipDiv);
        this.dom.appendChild(tooltipDiv);

        // var popupdiv = createDiv("contextPopupMenuDiv");
        // popupdiv.style.position = "absolute";
        // popupdiv.style.zIndex = "110";
        // popupdiv.style.opacity = 1.0;
        // popupdiv.style.top = 0;
        // popupdiv.style.width = 1200;
        // popupdiv.style.height = 600;

        // this.innerViews.set("contextPopupMenuDiv", popupdiv);
        // this.dom.appendChild(popupdiv);

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
            // event.preventDefault();
        }, false);

        this.renderer.domElement.addEventListener('click', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.click, intersects);
        }, false);

        this.renderer.domElement.addEventListener('dblclick', (event)=>{
            var intersects = this._getIntersects(event);
            this._handleEvent(event, this.events.dblclick, intersects);
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
                this.camera.position.x += deltaX/4;
                this.camera.position.z += deltaY/4;
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

    _onDocumentKeyDown (event) {
        this._dispatch(this.events.keydown, event);
    }

    _onDocumentKeyUp(event) {
        this._dispatch(this.events.keyup, event);
    }

    _onDocumentMouseDown(event){
        this._dispatch(this.events.mousedown, event);
    }

    _onDocumentMouseUp(event){
        this._dispatch(this.events.mouseup, event);
    }

    _onDocumentMouseMove(event){
        this._dispatch(this.events.mousemove, event);
    }

    _onDocumentMouseOver(event){
        this._dispatch(this.events.mouseover, event);
    }

    _onDocumentMouseOut(event){
        this._dispatch(this.events.mouseout, event);
    }

    _onDocumentTouchStart(event){
        this._dispatch(this.events.touchstart, event);
    }

    _onDocumentTouchEnd(event){
        this._dispatch(this.events.touchend, event);
    }

    _onDocumentTouchMove(event){
        this._dispatch(this.events.touchmove, event);
    }

    _onResize() {
        this._setSize(window.innerWidth, window.innerHeight);
        this.update();
    }

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
        switch(ename) {
            case "click":
                this.events.click.push(callback);
                break;
            case "dblclick":
                this.events.dblclick.push(callback);
                break;
            case "rightclick":
                this.events.rightclick.push(callback);
                break;
            case "contextmenu":
                this.events.rightclick.push(callback);
                break;
            case "mousewheel" :
                this.events.mousewheel.push(callback);
                break;
            case "mouseover" :
                this.events.mouseover.push(callback);
                break;
            case "mouseout" :
                this.events.mouseout.push(callback);
                break;
            case "mousemove" :
                this.events.mousemove.push(callback);
                break;
            case "mousedown" :
                this.events.mousedown.push(callback);
                break;
            case "mouseup" :
                this.events.mouseup.push(callback);
                break;
            case "init" :
                this.events.init.push(callback);
                break;
            case "start" :
                this.events.start.push(callback);
                break;
            case "stop":
                this.events.stop.push(callback);
                break;
            case "load":
                this.events.load.push(callback);
                break;
            case "resize":
                this.events.resize.push(callback);
                break;
            case "update":
                this.events.update.push(callback);
                break;
            default:
                break;
        }
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

    registerInnerDiv(name, innerDiv) {
        this.dom.appendChild(innerDiv);
        this.innerViews.set(name, innerDiv);
    }

    // async createInnerDiv (name, style) {
    //     var innerDiv = document.createElement('div');
    //     innerDiv.id =  name;
    //     // innerDiv.style.position = "relative";
    //     // innerDiv.style.zIndex = "110";
    //     // innerDiv.style.opacity= 0.9;
    //     // innerDiv.style.top = 0;
    //     // innerDiv.style.left= 0;
    //     // innerDiv.style.width="1000px";
    //     // innerDiv.style.height="600px";
    //     // innerDiv.innerText = 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'
    //     innerDiv.style = style;

    //     this.dom.appendChild(innerDiv);
        
    //     this.innerViews.set(name, innerDiv);
    //     return innerDiv;
    // }

    findInnerDiv (name) {
        return this.innerViews.get(name);
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

            this._dispatch(this.events.load, arguments);
        });
    }

    magnify (objName, ratio) {

    }

    move (objName, position) {

    }

    preset (name) {

    }

    removeInnerDiv(name) {
        var deleted = false;
        var innerView = this.innerViews.get(name);
        if(innerView !== undefined) {
            deleted = true;
            this.dom.remove(innerDiv);
        }        
        return deleted;
    }

    setScreenSize (width, height) {

    }

    showAllObjects (options) {

    }

    start () {
        this.prevTime = performance.now();
        // register event listeners
        // document.addEventListener('keydown', (event) => {
        //     this._onDocumentKeyDown(event);
        // });
        // document.addEventListener('keyup', (event) => {
        //     this._onDocumentKeyUp(event);
        // });
        // document.addEventListener('mousedown', (event) => {
        //     this._onDocumentMouseDown(event);
        // });
        // document.addEventListener('mouseup', (event) => {
        //     this._onDocumentMouseUp(event);
        // });
        // document.addEventListener('mousemove', (event) => {
        //     this._onDocumentMouseMove(event);
        // });
        // document.addEventListener('mouseover', (event) => {
        //     this._onDocumentMouseOver(event);
        // });
        // document.addEventListener('mouseout', (event) => {
        //     this._onDocumentMouseOut(event);
        // });
        // document.addEventListener('touchstart', (event) => {
        //     this._onDocumentTouchStart(event);
        // });
        // document.addEventListener('touchend', (event) => {
        //     this._onDocumentTouchEnd(event);
        // });
        // document.addEventListener('touchmove', (event) => {
        //     this._onDocumentTouchMove(event);
        // });
        // document.addEventListener('resize', (evnet) => {
        //     this._onResize();
        // });

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
        // document.removeEventListener('keydown', this._onDocumentKeyDown);
        // document.removeEventListener('keyup', this._onDocumentKeyUp);
        // document.removeEventListener('mousedown', this._onDocumentMouseDown);
        // document.removeEventListener('mouseup', this._onDocumentMouseUp);
        // document.removeEventListener('mousemove', this._onDocumentMouseMove);
        // document.removeEventListener('mouseover', this._onDocumentMouseOver);
        // document.removeEventListener('mouseout', this._onDocumentMouseOut);
        // document.removeEventListener('touchstart', this._onDocumentTouchStart);
        // document.removeEventListener('touchend', this._onDocumentTouchEnd);
        // document.removeEventListener('touchmove', this._onDocumentTouchMove);
        // document.removeEventListener('resize', this._onResize);

        this.renderer.setAnimationLoop(null);
    }

    stopAnimation (options) {

    }

    update () {
        this._render();
    }

    updateUserData (objName, userData) {

    }
}

const Eventkind = {
    click: "click",
    dblclick: "dblclick",
    rightclick: "rightclick",
    contextmenu: "contextmenu",
    mousewheel: "mousewheel",
    mouseover: "mouseover",
    mouseout: "mouseout",
    mousemove: "mousemove",
    mousedown: "mousedown",
    mouseup: "mouseup",
    init: "init",
    start: "start",
    stop: "stop",
    load: "load",
    resize: "resize",
    update: "update"
}

export default MonEngine;
export {
    Eventkind
}