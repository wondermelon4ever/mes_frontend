import React from 'react';

//import PageWrapper from './PageWrapper';

const Layout1 = (props) => {
    return (
        // TO-DO: need to assign theme
        <div style={{ width: "100%", marginLeft: "10px", marginTop: "15px", arginRight: "auto" }} >
            {/* <PageWrapper > */}
                { props.children }
            {/* </PageWrapper> */}
        </div>
    );
}

export default Layout1;