import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import BodyRouteWrapper from './BodyRouteWrapper';

var temp = new Map();
var bodyRouter = undefined;

class BodyRouter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            presenterMap: new Map()
        }

        this.init(props.config);

        this.init = this.init.bind(this);
        this.addRoute = this.addRoute.bind(this);

        if(bodyRouter === undefined) bodyRouter = this;
    }

    init(config) {
        //  설정에서 라우트 정보들을 가져올 수도 있음
    }

    addRoute(aroute) {
        var presenterMap = this.state.presenterMap;
        presenterMap.set(aroute.key, aroute.presenter);
        this.setState({
            preseneterMap: presenterMap
        });
    }
    
    render () {
        return (
            <div style={{ height: '100%' }}>
                <Switch>
                    {
                        this.state.presenterMap.forEach((route, key)=>{
                            <BodyRouteWrapper { ... props } 
                                path={ key }
                                presenter={ route.presenter }
                                layout={ route.layout }
                            />
                        })
                    }
{/*             
            { 
                presenterMap.forEach(route => {
                  <Route exact path={route.key} component={ route.presenter } { ...props } render={({ ...props}) =>\
                    <div>
                        { route.presenter }
                    </div>
                  } />
                })
            } */}
                {/* <Route exact path="/" component={Home} />
                <BodyRouteWrapper {...props} 
                    path="/auth/login"
                    presenter={ presenterMap.get("/auth/login")}
                    layout="layout-1"
                /> */}
                </Switch>

            </div>
        );
    }
}

const addRouteBySingle = (aroute) => {
    if(bodyRouter === undefined) {

    } else {
        bodyRouter.addRoute(aroute);
    }
}

const addRouteByMap = (routeMap) => {

}

export default withRouter(BodyRouter);
export {
    addRouteBySingle,
    addRouteByMap
}