import { useImperativeHandle, useState } from 'react';
import SockJsClient from 'react-stomp';

const MessageListenClient = React.forwardRef((props, ref) => {

    const id = props.id;
    const url= props.url;
    const topics = props.topics;
    const handleOnMessage = props.handleOnMessage;
    const handleOnConnected = props.handleOnConnected;
    const handleOnDisconnected = props.handleOnDisconnected;

    const [client, setClient] = useState(undefined);
    const [clientConnected, setClientConnected] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            sendMessage = (topics, message) => {
                if(clientConnected === true) {
                    client.sendMessage(topics, message);
                } else {
                    console.log("");
                }
            }
        }
    });

    return (
        <>
            <SockJsClient 
                url = { url }    
                topics = { topics }
                onMessage = { (message) => {
                    handleOnMessage(message);
                }}
                ref={ (client) => {
                    setClient(client);
                }}
                onConnect = {
                    () => {
                        setClientConnected(true);
                        if(handleOnConnected !== undefined) handleOnConnected();
                    }
                }
                onDisconnect = {
                    () => {
                        setClientConnected(false);
                        if(handleOnDisconnected !== undefined) handleOnDisconnected();
                        clientRefs.deleted(id);
                    }
                }
                autoReconnect = { true }
                debug = { true }
                style = {[{ width: '100%', height: '100%' }]}
                headers = {[{ userId: props.userId }]}
            />
        </>
    );

});

export default MessageListenClient;
