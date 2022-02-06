import React from 'react';
import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';

const createSvgIcon = (props, pathv, onClickCallback) => {
    return (
        <SvgIcon onClick={ onClickCallback } { ...props }>
            <path d={ pathv } />
        </SvgIcon>
    );
}

const createCustomIcon = (props, imgPath, onClickCallback) => {
    return (
        <Icon onClick={ onClickCallback } { ...props }>
            <img src = {imgPath} />
        </Icon>
    );
}

export {
    createSvgIcon,
    createCustomIcon
}