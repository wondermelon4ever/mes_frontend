import React from 'react';

const Layout1 = (props) => {
    return (
        // TO-DO: need to assign theme
        <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }} >
            { props.children }
        </div>
    );
}

export default Layout1;