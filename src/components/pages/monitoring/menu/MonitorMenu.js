import React, { Component } from 'react';

import { saveAs } from 'file-saver';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// const CircularJSON = require('circular-json');
require("es6-promise").polyfill();

import CaptureModal from './CaptureModal';
import MovingHistoryRequestModal from './simulation/MovingHistoryRequestModal';
import MovementManager from './tools/MovementManager';
import CoordinateGenerator from './tools/CoordinateGenerator';
import RequestSender from './RequestSender';

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
            coordinateGenShow: false
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

    onResize() {
        this.setState({
            width: window.innerWidth
        })
    }

    onMessage(settings) {
        switch(settings.kind) {
        case "PRESET_LIST" :
            this.setState({
                presets : settings.presets
            })
            break;
        case "CAPTURE_IMAGE" :
            this.setState({
                showCapturePopup : true,
                captureImage: settings.captureImage,
            });
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
        if(checkbox.checked == true) checkbox.checked = false;
        else checkbox.checked = true;
        this.state.callback({ "command" : "FREEZE_SCREEN", "value" : checkbox.checked })
    }

    addPreset(name) {
        this.state.callback({"command": "PRESET_ADD", "name": name });
    }

    gotoPreset(name) {
        this.state.callback({"command": "PRESET_GO", "name": name });
    }

    getCurrentState() {
        this.state.callback({"command": "CURRENT_STATE_GET"});
    }

    clearAllPreset() {
        this.state.callback({"command": "PRESET_CLEAR_ALL"});
    }

    capture() {
        console.log("##### CAPTURE #####");
        var image = this.state.callback({"command": "CAPTURE"});
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

        this.state.callback({ "command" : "MAGNIFY_OBJECT", "value" : checkbox.checked })
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
        console.log("requestVehicleCollision in the MenuBar.js");
        var rs = new RequestSender();
        rs.post({}, "/testVehicleCollision");
    }

    requestVehicleMission() {
        console.log("requestVehicleMission in the MenuBar.js");
        var rs = new RequestSender();
        rs.post({}, "/requestVehicleMission");
    }

    configure() {

    }

    help() {

    }

    render()  {
        return(
            <div style= { { "width" : this.state.width } }>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Monitor</Navbar.Brand>
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
                            <NavDropdown title="Initial Data" id="initial-data">
                                <NavDropdown.Item onClick={ this.getCurrentState }>Get Current Data (From Server)</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Screen" id="basic-screen-dropdown">
                                <NavDropdown.Item onClick={ this.freezeScreen }><input type='checkbox' id="freezeCheckbox"></input>&nbsp;&nbsp;Freeze Screen</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.tooltipEnable }><input type='checkbox' id="tooltipCheckbox"></input>&nbsp;&nbsp;Enable Tooltip</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.magnify }><input type='checkbox' id="magnifyCheckbox"></input>&nbsp;&nbsp;Magnify</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.capture }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Capture</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Preset" id="basic-preset-dropdown">
                                <NavDropdown title="Go to" id="preset-goto-dropdown" drop="right">
                                    <NavDropdown.Item onClick={ ()=> { this.gotoPreset("Initial")}}>Initial</NavDropdown.Item>
                                        {
                                            this.state.presets.map((name, index) => {
                                                return [
                                    <NavDropdown.Item key={"preset-"+index} onClick={ ()=> { this.gotoPreset(name)}}>{name}</NavDropdown.Item>
                                            ]})
                                        }
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#clearPreset">Clear</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.clearAllPreset }>Clear all</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#configuration">Configuration</Nav.Link>
                            <NavDropdown title="Test" id="basic-preset-dropdown">
                                <NavDropdown.Item onClick={ this.requestVehicleCollision }>Vehicle Collision Test</NavDropdown.Item>
                                <NavDropdown.Item onClick={ this.requestVehicleMission }>Request Vehicle Mission</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#help">Help</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" id="presetName" placeholder="type preset name" className="mr-sm-2" />
                            <Button variant="outline-success" onClick={ ()=>{this.addPreset(document.getElementById("presetName").value)}}>Add Preset</Button>
                        </Form>
                        &nbsp;&nbsp;
                        <Form inline>
                            <FormControl type="text" id="objectNameToBeFound" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success" onClick={ ()=>{ this.findObject(document.getElementById("objectNameToBeFound").value) }}>Object Search</Button>
                        </Form>
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