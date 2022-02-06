import React from 'react';

const Logger = React.forwardRef((props, ref) => {

    useImperativeHandle(ref, () => {
        debug = (message) => {
                
        },

        info = (message) => {

        },

        warn = (message) => {

        }
        
        return <div/>
    });
});

export default Logger;