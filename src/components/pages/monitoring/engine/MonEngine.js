import * as THREE from 'three';
import OBJLoader  from 'three-obj-loader';
import MeshLine from 'three.meshline';

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

        this.camRotationX, this.camRotationY, this.camRotationZ, this.camPositionX, this.camPositionY, this.camPositionZ, this.camFov;
        this.sceRotationX, this.sceRotationY, this.sceRotationZ, this.scePositionX, this.scePositionY, this.scePositionZ;

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

        var temp = localStorage.presets;
        if(temp && temp.length > 0) temp = new Map(JSON.parse(localStorage.presets));
        else temp = new Map();
        this.presets = temp;

        // if(this.presets.get("INIT") === undefined) {
        //     this.presets.set("INIT", {

        //     });
        // }
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
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera({ x: this.mouse.x, y: this.mouse.y }, this.camera);
        return this.raycaster.intersectObjects(this.scene.children, true);
    }

    _handleEvent (event, eventkind, intersects) {
        if(eventkind === undefined || eventkind === null) return;
        eventkind.forEach((callback)=>{
            try {
                var object =  undefined, objName = undefined, userData = undefined;
                var objPos = { x: "", y: "", z: "" }, coordinate = { x: "", y: "", x: "" };
                if(intersects !== null && intersects !== undefined && intersects.length > 0) {
                    object = intersects[0].object;

                    if(object !== undefined) {
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
        this.dom.id = "monroot";

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
            event.preventDefault();
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

        this.camRotationX = this.camera.rotation.x, this.camRotationY = this.camera.rotation.y, this.camRotationZ = this.camera.rotation.z;
        this.camPositionX = this.camera.position.x, this.camPositionY = this.camera.position.y, this.camPositionZ = this.camera.position.z;
        this.camFov = this.camera.fov;
    
        this.sceRotationX = this.scene.rotation.x, this.sceRotationY = this.scene.rotation.y, this.sceRotationZ = this.scene.rotation.z;
        this.scePositionX = this.scene.position.x, this.scePositionY = this.scene.position.y, this.scePositionZ = this.scene.position.z;

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
        console.log("Resize event =>" + event);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

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

    //======== public functions ========
    // functions related to control
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

    applyParent (parentDom) {
        this.parent = parentDom;
    }

    applyStyle (style) {

    }

    captureSceneShot (options) {
        return this.renderer.domElement.toDataURL();
    }

    createInnerDiv (name, style) {
        var innerDiv = document.createElement('div');
        innerDiv.id =  name;
        innerDiv.style = style;

        this.dom.appendChild(innerDiv);
        this.innerViews.set(name, innerDiv);
        return innerDiv;
    }

    findInnerDiv (name) {
        return this.innerViews.get(name);
    }

    fixScreen(fixed) {
        if(fixed == true) {
            this.screenFixed = true;
            //controls.enabled = false;
        } else {
            this.screenFixed = false;
            //controls.enabled = true;
        }
    }

    getName () {
        return this.name;
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
        var object = this.scene.getObjectByName(objName);
        this.camera.fov = ratio;
        this.camera.up  = new THREE.Vector3(0,0,1);
    
        this.camera.lookAt(object.position.x, object.position.y, object.position.z);
        this.camera.updateProjectionMatrix();
    }

    registerInnerDiv(name, innerDiv) {
        this.dom.appendChild(innerDiv);
        this.innerViews.set(name, innerDiv);
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
        this._setSize(width, height);
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

    update () {
        this._render();
    }

    // functions related to object
    addObject(objName, objType, size, initialLoation, options) {
        var object = undefined;
        switch(objType) {
            case "CYLINDER" :
                var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 0.5, 32 );
                var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                var cylinder = new THREE.Mesh( geometry, material );
                cylinder.name = objName;
                object = cylinder;
                if(options.userData !== undefined) object.userData = options.userData;
                break;
            default:
                break;
        }

        this.scene.add(object);
    }

    addObjectModel(fileName, objectName) {
        var objectLoader = new THREE.ObjectLoader();
        objectLoader.load(fileName, (object)=>{
          object.name = objectName;
          object.userData = {};
          scene.add(object);
        }, (xhr)=>{
          console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded');
        }, error=>{
          console.log( 'An error happened => ' + error );
        });
    }

    blink(name, callback = null, targetTime = 10000, blinkPeriod = 400) {
        var target = this.findObject(name);
        if(target === undefined) {
            console.log("object name [" + name + "] is not defined. blink command will be igonerd.");
            return;
        }
    
        var state = target.visible;
    
        var flag = true;
        var startTime = new Date().getTime();
        var interval = setInterval(()=>{
            if(flag) this.hideObject(name);
            else this.showObject(name);
    
            flag = !flag;
    
            if(new Date().getTime()-startTime >= targetTime) {
                if(callback != null) callback();
                if(state == true) this.showObject(name);
                else this.hideObject(name);
                clearInterval(interval);
            }
        }, blinkPeriod);
    }
    
    changeColor (objName, color) {
        var target = this.findObject(objName);
        if(target === undefined) {
            console.log("object [" + objName + "] is not defined. changeColor command will be igonerd.");
            return;
        }
        target.material.color.set(color);
        // this._render();
    }

    extractObjectColor(objName) {
        var target = this.findObject(objName);
        if(target === undefined) {
          console.log("object [" + objName + "] is not defined. extractObjectColor command will be igonerd.");
          return;
        }
        return target.material.color.getHexString();
    }
    
    extractObjectEmissive(objName) {
        var target = this.findObject(objName);
        if(target === undefined) {
          console.log("object [" + objName + "] is not defined. extractObjectEmissive command will be igonerd.");
          return;
        }
        return target.material.emissive.getHexString();
    }

    findObject(objName) {
        var object = this.scene.getObjectByName(objName, true);
    
        if(object === undefined) {
          console.log("Wrong object [" + objName +  "]. Please check your parameter which is registered name in your model.");
          return undefined;
        }
        return object;
    }
    
    findObjectList(objNamePattern) {
        var objList = [];
        this.scene.children.forEach(object=>{
            if(objNamePattern.trim() === "" || object.name.startsWith(objNamePattern)) {
                objList.push(object);
            }
        });
        return objList;
    }

    hideAll (options) {
        this.scene.visible = true;
    }

    hideObject(name) {
        var target = this.scene.getObjectByName(name);
        if(target === undefined) {
            console.log("object name [" + name + "] is not defined. hideObject command will be igonerd.");
            return ;
        }
        target.visible = false;
    }

    positionsObject(objName, pos) {
        var object = this.findObject(objName);
        if(object === undefined) return;
        
        object.position.x = pos.x;
        object.position.y = pos.y;
        object.position.z = pos.z;
    }

    move (objName, position) {

    }

    showObject (objName) {
        var target = this.scene.getObjectByName(objName);
        if(target === undefined) {
            console.log("object [" + objName + "] is not defined. showObject command will be igonerd.");
            return;
        }
        target.visible = true;
    }

    showAll (options) {
        this.cene.visible = true;
    }

    // functions related to draw line and arrow
    deleteLine(line) {
        scene.remove(line);
    }

    drawArrow(source, target, length, color, headLength, headWidth) {
        var sourcePos = new THREE.Vector3(source.x, source.y, source.z), targetPos = new THREE.Vector3(target.x, target.y, target.z);
        var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);
        var arrowHelper = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, length, color, headLength, headWidth);
    
        scene.add(arrowHelper);
        return arrowHelper;
    }
    
    drawLine(points, options) {
        console.log("drawLine ==> " + options.color);
        //var material = new THREE.LineBasicMaterial({ color: color, linewidth: 50 });
        var material = new MeshLine.MeshLineMaterial({ color: new THREE.Color(options.color), lineWidth: options.lineWidth, opacity: options.opacity, transparent: true, dashArray: options.dashArray });
        var geometry = new THREE.BufferGeometry();
        points.forEach(point=>{
          var pos = new THREE.Vector3(point.x, point.y, point.z);
          geometry.vertices.push(pos);
        });
    
        //var line = new THREE.Line(geometry, material);
        var line = new MeshLine.MeshLine();
        line.setGeometry(geometry, function(p) { return 1; } );
    
        var mesh = new THREE.Mesh(line.geometry, material);
        scene.add(mesh);
    
        //renderer.render(scene, camera);
        return mesh;
    }

    // functions related to animation
    startAnimation (options) {

    }

    stopAnimation (options) {

    }

    // functions related to handling user data
    updateUserData (objName, userData) {
        var object = this.findObject(objName);
        if(object !== undefined) object.userData = userData;
    }

    // functions related presets management
    addPreset(name) {
        var preset = {
            name: name,
            positions: {
                crx: this.camera.rotation.x,
                cry: this.camera.rotation.y,
                crz: this.camera.rotation.z,
                cpx: this.camera.position.x,
                cpy: this.camera.position.y,
                cpz: this.camera.position.z,
                fov: this.camera.fov,
                sry: this.scene.rotation.y,
                srx: this.scene.rotation.x,
                srz: this.scene.rotation.z,
                spy: this.scene.position.y,
                spx: this.scene.position.x,
                spz: this.scene.position.z
            }
        };
    
        this.presets.set(name, preset);
        localStorage.presets = JSON.stringify(Array.from(this.presets.entries()));
    }

    clearPreset(name) {
        this.presets.delete(name);
    }

    clearPresets() {
        this.presets.clear();
        localStorage.presets = JSON.stringify(Array.from(this.presets.entries()));
    }
   
    getPresets() {
        var names = [];
        Array.from(this.presets).forEach((preset, key) => {
            names.push({ name: preset[1].name, positions: preset[1].positions });
        });
        return names;
    }

    gotoInitialView() {
        this.camera.rotation.x = this.camRotationX;
        this.camera.rotation.y = this.camRotationY;
        this.camera.rotation.z = this.camRotationZ;
        this.camera.position.x = this.camPositionX;
        this.camera.position.y = this.camPositionY;
        this.camera.position.z = this.camPositionZ;
        this.camera.fov = this.camFov;
    
        this.scene.rotation.x = this.sceRotationX;
        this.scene.rotation.y = this.sceRotationY;
        this.scene.rotation.z = this.sceRotationZ;
        this.scene.position.x = this.scePositionX;
        this.scene.position.y = this.scePositionY;
        this.scene.position.z = this.scePositionZ;
    
        this.camera.updateProjectionMatrix();
      }

    preset(name) {
        console.log("PRESET name =>" + name);
        var preset = this.presets.get(name);
        this.scene.rotation.x = preset.positions.srx;
        this.scene.rotation.y = preset.positions.sry;
        this.scene.rotation.z = preset.positions.srz;
        this.scene.position.x = preset.positions.spx,
        this.scene.position.y = preset.positions.spy,
        this.scene.position.z = preset.positions.spz,
    
        this.camera.fov = preset.positions.fov;
        this.camera.rotation.x = preset.positions.crx;
        this.camera.rotation.y = preset.positions.cry;
        this.camera.rotation.z = preset.positions.crz;
        this.camera.position.x = preset.positions.cpx;
        this.camera.position.y = preset.positions.cpy;
        this.camera.position.z = preset.positions.cpz;

        this.camera.updateProjectionMatrix();
    }
    
    removePreset(name) {
        this.presets.delete(name);
        localStorage.presets = JSON.stringify(Array.from(this.presets.entries()));
    }
    
    updatePreset(name) {
        var preset = {
            name: name,
            positions: {
                crx: this.camera.rotation.x,
                cry: this.camera.rotation.y,
                crz: this.camera.rotation.z,
                cpx: this.camera.position.x,
                cpy: this.camera.position.y,
                cpz: this.camera.position.z,
                fov: this.camera.fov,
                sry: this.scene.rotation.y,
                srx: this.scene.rotation.x,
                srz: this.scene.rotation.z,
                spy: this.scene.position.y,
                spx: this.scene.position.x,
                spz: this.scene.position.z
            }
        };
    
        this.presets.set(name, preset);
        localStorage.presets = JSON.stringify(Array.from(this.presets.entries()));
    }

    // functions related to tooltip contorl
    showTooltipPopup(position, contents) {
        var tooltip = document.getElementById("tooltip");
        tooltip.style.backgroundColor = "#ffffff";
        tooltip.style.position = "absolute";
        tooltip.style.left = position.x+"pt";
        tooltip.style.top  = position.y+"pt";
        tooltip.innerHTML = contents;
        tooltip.style.display = "block";
    }
    
    hideTooltipPopup() {
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
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