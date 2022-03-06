import React from 'react';

import SlidingInformDialog from './SlidingInformDialog';

var info0 = undefined, info1 = undefined, info2 = undefined, info3 = undefined, info4 = undefined, info5 = undefined;
const SlidingInformControl = (props) => {

    var interval = undefined;

    const [inform0, setInform0] = React.useState(undefined);
    const [inform1, setInform1] = React.useState(undefined);
    const [inform2, setInform2] = React.useState(undefined);
    const [inform3, setInform3] = React.useState(undefined);
    const [inform4, setInform4] = React.useState(undefined);
    const [inform5, setInform5] = React.useState(undefined);

    const manageInform = () => {
        var now = Date.now();
        if(info0 !== undefined && now-info0.timestamp > 3500) setInform0(undefined);
        if(info1 !== undefined && now-info1.timestamp > 3500) setInform1(undefined);
        if(info2 !== undefined && now-info2.timestamp > 3500) setInform2(undefined);
        if(info3 !== undefined && now-info3.timestamp > 3500) setInform3(undefined);
        if(info4 !== undefined && now-info4.timestamp > 3500) setInform4(undefined);
        if(info5 !== undefined && now-info5.timestamp > 3500) setInform5(undefined);
    };

    React.useEffect(()=>{
        interval = setInterval((manageInform), 5000);
        return(()=>{
            if(interval !== undefined) clearInterval(interval);
        });
    }, []);

    React.useEffect(()=>{
        if(inform0 === undefined) { setInform0(props.inform); info0 = props.inform; }
        else if(inform1 === undefined) { setInform1(props.inform); info1 = props.inform; }
        else if(inform2 === undefined) { setInform2(props.inform); info2 = props.inform; }
        else if(inform3 === undefined) { setInform3(props.inform); info3 = props.inform; }
        else if(inform4 === undefined) { setInform4(props.inform); info4 = props.inform; }
        else if(inform5 === undefined) { setInform5(props.inform); info5 = props.inform; }
    }, [props.inform]);

    const confirmed = (num) => {
        switch(num) {
            case 0: setInform0(undefined); break;
            case 1: setInform1(undefined); break;
            case 2: setInform2(undefined); break;
            case 3: setInform3(undefined); break;
            case 4: setInform4(undefined); break;
            case 5: setInform5(undefined); break;
        }
    }

    return (
        <div>
            <SlidingInformDialog num={0} callback={ confirmed } inform={ inform0 } options={{ bottom: 45  }} />
            <SlidingInformDialog num={1} callback={ confirmed } inform={ inform1 } options={{ bottom: 195 }} />
            <SlidingInformDialog num={2} callback={ confirmed } inform={ inform2 } options={{ bottom: 345 }} />
            <SlidingInformDialog num={3} callback={ confirmed } inform={ inform3 } options={{ bottom: 495 }} />
            <SlidingInformDialog num={4} callback={ confirmed } inform={ inform4 } options={{ bottom: 645 }} />
            <SlidingInformDialog num={5} callback={ confirmed } inform={ inform5 } options={{ bottom: 795 }} />
        </div>
            // <SlidingWindow theme={ theme } show={ show } options={ options }>
            //     {informs !== undefined && informs.length > 0 ? informs[0].body : "no inform"}
            // </SlidingWindow>
        // <div>
        //     {
        //         informs.map((inform, index)=>{
        //             <SlidingWindow key={index} theme={theme} options={options}>
        //                 {inform.body}
        //             </SlidingWindow>
        //         })
        //     }
            
        // </div>
        // <div 
        //     style={{ 
        //         position: 'fixed',
        //         display: show ? "block": "none",
        //         width: 240, 
        //         height: 200,
        //         animation: "fade-in 1s",
        //         animationFillMode: "forwards", 
        //         right: 0,
        //         bottom: 45,
        //         backgroundColor: "gray"
        //     }}
        // >
        //     Sample informing windows
        // </div>
    );
}

export default SlidingInformControl;