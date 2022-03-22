import React from 'react';
import Home from './home/Home';
import Monitor from './monitoring/Monitor';
import ThemeSelection from './commns/settings/ThemeSelection';
import WorkOrder from './workorders/WorkOrder';

var inited = false;

const configureRoutes = (props) => {
    if(inited == true) return;
    inited = true;

    var routeList = [];
    var home = {
        "key": "/",
        "presenter": <Home { ...props } />,
        "breadcrumb": "홈",
        "layout": "layout-1"
    };

    const size = {
        "width": "1000",
        "height": "600"
    };

    var monitor = {
        "key": "/monitoring",
        "presenter": <Monitor json="app3.json" size={ size } { ...props } />,
        "breadcrumb": "모니터링",
        "layout": "layout-1"
    };

    var themeSelection = {
        "key": "/themeSelection",
        "presenter": <ThemeSelection { ...props } />,
        "breadcrumb": "테마선택",
        "layout": "layout-1"
    }

    var workOrder = {
        "key": "/workorder",
        "presenter": <WorkOrder {...props}/>,
        "breadcrumb": "워크오더",
        "layout": "layout-1"
    }
    
    routeList.push(home);
    routeList.push(monitor);
    routeList.push(themeSelection);
    routeList.push(workOrder);

    return routeList;
}

export {
    configureRoutes,
    Home,
    ThemeSelection
}