import React from 'react';

const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width:'100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.65)'
}
   
const modalMainStyle = {
    position: 'fixed',
    background: 'white',
    width: '80%',
    height: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
}
      
const displayBlockStyle = {
    display: 'block'
}
      
const displayNoneStyle = {
    display: 'none'
}

class CaptureModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            handleClose: this.props.handleClose,
            handleSave: this.props.handleSave,
            captureImage: this.props.captureImage
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps called.");
    }

    render() {
        return(
            <div style={Object.assign({}, modalStyle, this.props.show ? displayBlockStyle : displayNoneStyle)}>
                <section style={modalMainStyle}>
                <div>
                    <img id="shotImage" src={this.props.captureImage} />
                </div>
                </section>
                <input id="fileNameToSave" type="text" size="20" placeholder="type file name1q  "/><br/>
                <button onClick={()=>this.state.handleSave(document.getElementById("fileNameToSave").value)}>Save</button>
                <button onClick={()=>this.state.handleClose()}>Close</button>
            </div>
        );
    }
}

export default CaptureModal;