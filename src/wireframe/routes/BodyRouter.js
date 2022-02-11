import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import BodyRouteWrapper from './BodyRouteWrapper';
import { configureRoutes } from '../../components/pages';

class BodyRouter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            presenterMap: configureRoutes(this.props)
        }
    }
 
    render () {
        return (
            // TO-DO: div style의 theme 반영 필요
            <div style={{ height: '100%', width: "100%" }}>
                <Routes>
                    {
                        this.state.presenterMap.map((route)=>{
                            return <Route
                                        key={ route.key }
                                        path={ route.key }
                                        element={ <BodyRouteWrapper path={ route.key } presenter={ route.presenter } layout={ route.layout } /> }
                                        { ...this.props }
                                    />
                        })
                    }
                </Routes>

            </div>
        );
    }
}

export default BodyRouter;