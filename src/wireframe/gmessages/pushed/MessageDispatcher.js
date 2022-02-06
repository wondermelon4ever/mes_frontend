import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageListenClient from './MessageListenClient';

var dispatcher = undefined;
var callbackMap = new Map();
var callbackCountMap = new Map();

const addMessageCallback = (mcode, callback) => {
    var callbacks = callbackMap.get(mcode);
    if(callbacks === undefined || callbacks === null) {
        callbacks = new Map();
    }
    var uuid = uuid4v();
    callbacks.set(uuid, callback);
    callbackMap.set(mcode, callbacks);

    var count = callbackCountMap.get(mcode);
    if(count === undefined | count === null) count = 0;
    count++;
    callbackCountMap.set(mcode, count);

    return uuid;
}

const removeMessageCallback = (mcode, callbackId) => {
    var callbacks = callbackMap.get(mcode);
    if(callbacks === undefined || callbacks === null) return;

    callbacks.delete(callbackId);
    var count = callbackCountMap.get(mcode);
    count--;
    callbackCountMap.set(mcode, count);
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

    dispatchMessage = (message) => {
        var callbacks = callbackMap.get(message.mcode);
        if(callbacks === undefined) return;

        callbacks.forEach((callback, key, map)=>{
            callback(message);
            console.log("### Message processed (" + JSON.stringify(message)+ ")");
        });
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