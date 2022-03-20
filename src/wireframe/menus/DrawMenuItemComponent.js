import React from 'react';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'
import { useTheme } from '@mui/material/styles';


const DrawMenuItemComponent  = (props) => {
    const theme = useTheme();
    const { className, onClick, link, state, children } = props

    // If link is not set return the orinary ListItem
    if (!link || typeof link !== 'string') {
        return (
            <ListItem
                button
                className={className}
                children={children}
                onClick={onClick}
            />
        )
    }

    // Return a LitItem with a link component
    return (
        <ListItem
            button
            className={className}
            children={children}
            component={forwardRef((props, ref) => <NavLink exact {...props} innerRef={ref} />)}
            // component={forwardRef((props: NavLinkProps, ref: any) => <NavLink to={{ pathname: '', state: {state}}} />)}
            to={{ pathname: link, state: state}}
            autoFocus={true}
            // to={link}
        />
    )
}

export default DrawMenuItemComponent;