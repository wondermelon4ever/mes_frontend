import React, { Component } from 'react';

import { saveAs } from 'file-saver';
import { Button, Col, Navbar, Nav, NavDropdown, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// const CircularJSON = require('circular-json');
require("es6-promise").polyfill();

import CaptureModal from './CaptureModal';
// import MovingHistoryRequestModal from './simulation/MovingHistoryRequestModal';
// import MovementManager from './tools/MovementManager';
// import CoordinateGenerator from './tools/CoordinateGenerator';
// import RequestSender from './RequestSender';

var messageReceiver;

export var onSettings = (settings) => {
    messageReceiver(settings);
}

export default class MenuBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            monEngine: this.props.monEngine,
            parentName: this.props.parentName,
            vehicleCount: this.props.vehicleCount,
            settings : this.props.setValues,
            height: 50,
            presets: this.props.presets === undefined ? [] : this.props.presets,
            callback: this.props.changeListener,
            showCapturePopup: false,
            captureImage: undefined,
            width: window.innerWidth,
            showMovingHistoryRequestUI: false,
            movementManager: undefined,
            coordinateGenShow: false,
            show: this.props.show
        }

        this.addPreset = this.addPreset.bind(this);
        this.capture = this.capture.bind(this);
        this.handleCaptureClose = this.handleCaptureClose.bind(this);
        this.handleCaptureSave = this.handleCaptureSave.bind(this);
        this.clearAllPreset = this.clearAllPreset.bind(this);
        this.configure = this.configure.bind(this);
        this.findObject = this.findObject.bind(this);
        this.freezeScreen = this.freezeScreen.bind(this);
        this.getCurrentState = this.getCurrentState.bind(this);
        this.gotoPreset = this.gotoPreset.bind(this);
        this.help = this.help.bind(this);
        this.hideAllVehicle = this.hideAllVehicle.bind(this);
        this.magnify = this.magnify.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.showAllVehicle = this.showAllVehicle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.tooltipEnable = this.tooltipEnable.bind(this);
        this.onResize = this.onResize.bind(this);
        this.showVehicleLocationHistoryDataQuery = this.showVehicleLocationHistoryDataQuery.bind(this);
        this.hideVehicleLocationHistoryDataQuery = this.hideVehicleLocationHistoryDataQuery.bind(this);
        this.showMovingHistoryTraceView = this.showMovingHistoryTraceView.bind(this);
        this.showMovingHistoryAll = this.showMovingHistoryAll.bind(this);
        this.hideMovingLineAll = this.hideMovingLineAll.bind(this);
        this.showGenerateRealworldCoordinate = this.showGenerateRealworldCoordinate.bind(this);
        this.hideGenerateRealWorldCoordinate = this.hideGenerateRealWorldCoordinate.bind(this);
        this.requestVehicleCollision = this.requestVehicleCollision.bind(this);
        this.requestVehicleMission = this.requestVehicleMission.bind(this);

        messageReceiver = this.onMessage;
        window.addEventListener('resize', this.onResize);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        console.log("==++++++++=>" + this.state.show);
    }

    onResize() {
        this.setState({
            width: window.innerWidth
        })
    }

    onMessage(settings) {
        switch(settings.kind) {
        case "PRESET_LIST" :
            console.log("PRESETS ==>" + JSON.stringify(settings.values));
            this.setState({
                presets : settings.values
            })
            break;
        case "CAPTURE_IMAGE" :
            this.setState({
                showCapturePopup : true,
                captureImage: settings.captureImage,
            });
            break;
        case "SHOW":
            const show = this.state.show;
            this.setState({
                show: !show
            })
            break;
        default:
            break;
        }
    }

    toggle() {
        var height = this.state.height;
        this.setState({
            height: height === 5 ? 50 : 5
        });
    }

    freezeScreen() {
        var checkbox = document.getElementById("freezeCheckbox");
        checkbox.checked = !checkbox.checked;
        this.state.callback({ "command" : "FREEZE_SCREEN", "value" : checkbox.checked })
    }

    addPreset(name) {
        this.state.callback({"command": "PRESET_ADD", "value": name });
    }

    gotoPreset(name) {
        this.state.callback({"command": "PRESET_GO", "value": name });
    }

    getCurrentState() {
        this.state.callback({"command": "CURRENT_STATE_GET"});
    }

    clearAllPreset() {
        this.state.callback({"command": "PRESET_CLEAR_ALL"});
    }

    clearPreset(name) {
        this.state.callback({ "command": "PRESET_CLEAR", "value": name });
    }

    capture() {
        console.log("##### CAPTURE #####");
        var image = this.state.callback({ command: "CAPTURE"});
        this.setState({
            showCapturePopup : true,
            captureImage : image
        });        
    }

    handleCaptureClose() {
        this.setState({
            showCapturePopup : false,
            captureImage: undefined
        })
    }

    handleCaptureSave(fileNametoSave) {
        // At this point, saving view would be supported. Currently simple close the opened modal window
        saveAs(this.state.captureImage, fileNametoSave);
        this.setState({
            showCapturePopup : false,
            captureImage: undefined
        })
    }

    magnify() {
        var checkbox = document.getElementById("magnifyCheckbox");
        if(checkbox.checked == true) checkbox.checked = false;
        else checkbox.checked = true;

        this.state.callback({ "command" : "MAGNIFY_ENABLE", "value" : checkbox.checked })
    }

    findObject(name) {
        this.state.callback({ "command": "OBJECT_FIND", "value": name });
    }

    tooltipEnable() {
        var checkbox = document.getElementById("tooltipCheckbox");
        if(checkbox.checked == true) checkbox.checked = false;
        else checkbox.checked = true;
        
        this.state.callback({ "command": "TOOLTIP_ENABLE", "value": checkbox.checked });
    }

    createMovementManager(callback) {
        if(this.state.movementManager === undefined) {
            var engine = this.state.monEngine, parentName = this.state.parentName, vehicleCount = this.state.vehicleCount;

            this.setState({
                movementManager: new MovementManager(engine, parentName, vehicleCount)
            }, callback);
        }
    }

    showMovingHistoryTraceView() {
        if(this.state.movementManager === undefined) {
                this.createMovementManager(()=>{
            this.state.movementManager.showTraceUI();
            });
        } else this.state.movementManager.showTraceUI();
    }

    showMovingHistoryAll() {
        if(this.state.movementManager === undefined) {
            this.createMovementManager(()=>{
                this.state.movementManager.showAllMovingTraceHistory("AGV-");
            });
        }
        else this.state.movementManager.showAllMovingTraceHistory("AGV-");
    }

    hideMovingLineAll() {
        if(this.state.movementManager === undefined) {
            this.createMovementManager(()=>{
                this.state.movementManager.hideAllMovingLine();
            });
        } else this.state.movementManager.hideAllMovingLine();
    }

    showGenerateRealworldCoordinate() {
        this.setState({
            coordinateGenShow : true
        }, ()=>{
        });
    }

    hideGenerateRealWorldCoordinate() {
        this.setState({
            coordinateGenShow : false
        });
    }

    showVehicleLocationHistoryDataQuery() {
        this.setState({
            showMovingHistoryRequestUI : true
        });
    }

    hideVehicleLocationHistoryDataQuery() {
        this.setState({
            showMovingHistoryRequestUI : false
        });
    }

    showAllVehicle() {

    }

    hideAllVehicle() {
        
    }

    requestVehicleCollision() {
        // console.log("requestVehicleCollision in the MenuBar.js");
        // var rs = new RequestSender();
        // rs.post({}, "/testVehicleCollision");
    }

    requestVehicleMission() {
        // console.log("requestVehicleMission in the MenuBar.js");
        // var rs = new RequestSender();
        // rs.post({}, "/requestVehicleMission");
    }

    configure() {

    }

    help() {

    }

    render()  {
        return(
            <div style= { { width : this.state.width, display: this.state.show ? "block" : "none" } }>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">3D Monitor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Simulation" id="simulation-dropdown">
                                <NavDropdown.Item onClick={ this.showVehicleLocationHistoryDataQuery }>Fetch vehicle location history data</NavDropdown.Item>
                                <NavDropdown.Item>Something menu-1</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>Something menu-2</NavDropdown.Item>
                                <NavDropdown.Item>Something menu-3</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Tools" id="analysis-dropdown">
                                <NavDropdown.Item onClick={ this.showMovingHistoryTraceView }>Trace moving history</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.showMovingHistoryAll }>Show moving history all</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.hideMovingLineAll }>Hide moving history line all</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={ this.showGenerateRealworldCoordinate }>Generate coordinate for realworld</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Screen" id="basic-screen-dropdown">
                                <NavDropdown.Item onClick={ this.freezeScreen }><input type='checkbox' id="freezeCheckbox"></input>&nbsp;&nbsp;Freeze Screen</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.tooltipEnable }><input type='checkbox' id="tooltipCheckbox"></input>&nbsp;&nbsp;Enable Tooltip</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.magnify }><input type='checkbox' id="magnifyCheckbox"></input>&nbsp;&nbsp;Magnify</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.capture }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Capture</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Preset" id="basic-preset-dropdown" drop="down">
                                <NavDropdown title="Go to" id="preset-goto-dropdown" menuVariant="dark" drop="end">
                                    <NavDropdown.Item key={ "init"} onClick={ ()=> { this.gotoPreset("Initial")}}>Initial</NavDropdown.Item>
                                        {
                                            this.state.presets.map( preset => {
                                                return [
                                    <NavDropdown.Item key={ preset.name } onClick={ ()=> { this.gotoPreset(preset.name)}}>{ preset.name }</NavDropdown.Item>
                                                ]})
                                        }
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown title="Clear" id="preset-clear-dropdown" menuVariant="dark" drop="end">
                                        {
                                            this.state.presets.map( preset => {
                                                return [
                                    <NavDropdown.Item key={ preset.name } onClick={ ()=> { this.clearPreset(preset.name)}}>{ preset.name }</NavDropdown.Item>
                                                ]})
                                        }
                                </NavDropdown>
                                <NavDropdown.Item onClick={ this.clearAllPreset }>Clear all</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#configuration">Configuration</Nav.Link>
                            <Nav.Link href="#help">Help</Nav.Link>
                        </Nav>
                        {/* <Form.Row> */}
                        {/* <Col> */}
                        <Form inline="true" style={{ display: "flex"}}>
                            <Form.Control type="text" id="presetName" placeholder="Type preset name" className="mr-sm-1" />
                            <Button variant="outline-success" onClick={ ()=>{this.addPreset(document.getElementById("presetName").value)}}>Add</Button>
                        </Form>
                       
                        &nbsp;&nbsp;
                        <Form inline="true" style={{ display: "flex"}}>
                            <Form.Control type="text" id="objectNameToBeFound" placeholder="Type object name" className="mr-sm-1" />
                            <Button variant="outline-success" onClick={ ()=>{ this.findObject(document.getElementById("objectNameToBeFound").value) }}>Search</Button>
                        </Form>
                        {/* </Col> */}
                        {/* </Form.Row> */}
                    </Navbar.Collapse>
                </Navbar>
                <CaptureModal 
                    title="Capture Image"
                    show={ this.state.showCapturePopup }
                    handleClose={ this.handleCaptureClose }
                    handleSave={ this.handleCaptureSave }
                    captureImage={ this.state.captureImage }/>
            </div>
        );
    }
}