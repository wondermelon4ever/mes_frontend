import React from 'react';

var userSession  = undefined;

const UserSessionDummy = (props) => {
    const [userSessionState, setUserSessionState] = React.useState(props.userSession);

    React.useEffect(()=>{
        userSession = props.userSession;
        setUserSessionState(props.userSession);
        return () => {}
    }, [props.userSession])

    return (
        <div />
    );
}

export default UserSessionDummy;
export {
    userSession
}