import React from 'react';

export default function GameText({ onClick, ...props }) {

    const handleClick = (event) => {
        if (onClick) {
            onClick();
            event.stopPropagation();
        }
    };

    return (
        <p key={props.id} style={props.style} onClick={handleClick}>
            {props.text}
        </p>
    );
}
