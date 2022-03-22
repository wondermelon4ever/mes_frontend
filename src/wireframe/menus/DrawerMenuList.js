import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { withStyles } from '@mui/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LayersIcon from '@mui/icons-material/Layers';

import { 
  ConveyorIcon,
  ForkLiftIcon ,
  MonitorWaveformIcon
} from '../../components/widgets/icons/CustomIcons';

const StyledTooltip = withStyles({
    // tooltipPlacementTop: {
    //   margin: "0px 0",
    //   padding: 0
    // },
    // tooltipPlacementBottom: {
    //   margin: "0px 0",
    //   padding: 0
    // }
  })(Tooltip);

const DrawerMenuList = (props) => {

    const theme = useTheme();
    const [menuSelected0, setMenuSelected0] = React.useState(true);
    const [menuSelected1, setMenuSelected1] = React.useState(false);
    const [menuSelected2, setMenuSelected2] = React.useState(false);
    const [menuSelected3, setMenuSelected3] = React.useState(false);
    const [menuSelected4, setMenuSelected4] = React.useState(false);
    const [menuSelected5, setMenuSelected5] = React.useState(false);
    const [menuSelected6, setMenuSelected6] = React.useState(false);
    const [menuSelected7, setMenuSelected7] = React.useState(false);
    const [menuSelected8, setMenuSelected8] = React.useState(false);

    const menuChangeListener = props.menuChangeListener;

    const menuSelectionChanged = (name, num) => {
        if(num == 0) setMenuSelected0(true);
        else setMenuSelected0(false);

        if(num == 1) setMenuSelected1(true);
        else setMenuSelected1(false);

        if(num == 2) setMenuSelected2(true);
        else setMenuSelected2(false);

        if(num == 3) setMenuSelected3(true);
        else setMenuSelected3(false);

        if(num == 4) setMenuSelected4(true);
        else setMenuSelected4(false);

        if(num == 5) setMenuSelected5(true);
        else setMenuSelected5(false);

        if(num == 6) setMenuSelected6(true);
        else setMenuSelected6(false);

        if(num == 7) setMenuSelected7(true);
        else setMenuSelected7(false);

        if(num == 8) setMenuSelected8(true);
        else setMenuSelected8(false);

        menuChangeListener(name, num);
    }

    return(
        <List component="nav">
        <React.Fragment>
            <StyledTooltip title="기준정보" arrow="true" placement="right">
                <ListItemButton 
                    // component={RouterLink} to="/monitoring" 
                    style={{ backgroundColor: menuSelected0 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("기준정보", 0) }
                >
                    <ListItemIcon >
                        <DataObjectIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="기준정보" /> */}
                </ListItemButton>
            </StyledTooltip>

            <StyledTooltip title="자재관리" arrow="true" placement="right">
                <ListItemButton 
                    style={{ backgroundColor: menuSelected1 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("자재관리", 1) }
                >
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="자재관리" /> */}
                </ListItemButton>
            </StyledTooltip>

            <StyledTooltip title="설비관리" arrow="true" placement="right">
                <ListItemButton 
                    style={{ backgroundColor: menuSelected2 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("설비관리", 2) }
                >
                    <ListItemIcon>
                        <PrecisionManufacturingIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="설비관리" /> */}
                </ListItemButton>
            </StyledTooltip>

            <StyledTooltip title="생산관리" arrow="true" placement="right">
                <ListItemButton 
                    style={{ backgroundColor: menuSelected3 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("생산관리", 3) }
                >
                    <ListItemIcon>
                        <ConveyorIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="생산관리" /> */}
                </ListItemButton>
            </StyledTooltip>

            <StyledTooltip title="물류관리" arrow="true" placement="right">
                <ListItemButton 
                    style={{ backgroundColor: menuSelected4 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("물류관리", 4) }
                >
                    <ListItemIcon>
                        <ForkLiftIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="물류관리" /> */}
                </ListItemButton>
            </StyledTooltip>

            <Divider sx={{ my: 1 }} />

            <StyledTooltip title="품질관리" arrow="true" placement="right">
                <ListItemButton 
                    // component={RouterLink} to="/workOrder" 
                    style={{ backgroundColor: menuSelected5 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("품질관리", 5) }
                >
                    <ListItemIcon>
                        <FactCheckIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="품질관리" /> */}
                </ListItemButton>
            </StyledTooltip>

            <StyledTooltip title="대시보드" arrow="true" placement="right">
                <ListItemButton 
                    style={{ backgroundColor: menuSelected6 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("대시보드", 6) }
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="대시보드" /> */}
                </ListItemButton>
            </StyledTooltip>

            <StyledTooltip title="모니터링" arrow="true" placement="right">
                <ListItemButton 
                    style={{ backgroundColor: menuSelected7 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("모니터링", 7) }
                >
                    <ListItemIcon>
                        <MonitorWaveformIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="" /> */}
                </ListItemButton>
            </StyledTooltip>

            <StyledTooltip title="리포트" arrow="true" placement="right">
                <ListItemButton 
                    style={{ backgroundColor: menuSelected8 ? "#d3d3d3": "white"}}
                    onClick={ () => menuSelectionChanged("리포트", 8) }
                >
                    <ListItemIcon>
                        <InsertChartIcon />
                    </ListItemIcon>
                    {/* <ListItemText primary="리포트" /> */}
                </ListItemButton>
            </StyledTooltip>
        </React.Fragment>
        </List>
    );
}

export default DrawerMenuList;