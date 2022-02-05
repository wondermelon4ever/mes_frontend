import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageListenClient from './MessageListenClient';

var dispatcher = undefined;
var callbackMap = new Map();
var callbackCountMap = new Map();

const addMessageCallback = (mcode, callback) => {

}

const removeMessageCallback = (mcode, callbackId) => {

}

const sendMessageToServer = (message) => {
    if(dispatcher !== undefined) dispatcher.sendMessageToServer(message);
}

export default class MessageDispatcher extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inited: false,
            client: React.createRef(),
            clientId: uuidv4(),
            url: props.url,
            topics: []
        }

        this.init();
        if(dispatcher === undefined) dispatcher = this;

        this.init = this.init.bind(this);
        this.sendMessageToServer = this.sendMessageToServer.bind(this);
        this.dispatchMessage = this.dispatchMessage.bind(this);
    }

    init = () => {
        if(this.state.inited == true) return;

        var topics = [];
        this.props.topics.forEach(topic => {
            topics.push(topic);
        });
        this.setState({
            topics: topics 
        });
    }

    sendMessageToServer = (message) => {
        client.current.sendMessage(message);
    }

    dispatchMessage = (event) => {
        
    }
    
    render() {
        return (
            <MessageListenClient 
                ref = { this.state.client }
                id = { this.state.clientId }
                userId = { this.props.userId }
                handleMessage = { this.dispatchMessage }
                url = { this.state.url }
                topics = { this.state.topics }
            />
        );
    }
}

export default MessageDispatcher;
export {
    addMessageCallback,
    removeMessageCallback,
    sendMessageToServer
}