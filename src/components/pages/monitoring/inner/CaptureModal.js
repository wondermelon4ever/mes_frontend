import React from 'react';

const modalStyle = {
    position: 'relative',
    top: '0',
    left: '0',
    width:'100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.65)'
}
   
const modalMainStyle = {
    position: 'relative',
    background: 'white',
    transform: 'scale(50%, 50%) translate(0%, -250px)'
    // width: '100%',
    // height: '50%',
    // top: '500px',
    // left: '600px',
    // transform: 'translate(-50%, -50%)'
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
                <input id="fileNameToSave" type="text" size="20" placeholder="type file name to save."/><br/>
                <button onClick={()=>this.state.handleSave(document.getElementById("fileNameToSave").value)}>Save</button>
                <button onClick={()=>this.state.handleClose()}>Close</button>
                <section style={modalMainStyle}>
                    <div>
                        <img id="shotImage" src={this.props.captureImage} />
                    </div>
                </section>
            </div>
        );
    }
}

export default CaptureModal;