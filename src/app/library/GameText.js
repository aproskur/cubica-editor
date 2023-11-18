import React from 'react';

export default function GameText({ onClick, children, ...props }) {

    const handleClick = (event) => {
        if (onClick) {
            onClick();
            event.stopPropagation();
        }
    };

    return (
        <div>
            <p key={props.id} style={props.style} onClick={handleClick}>
                {props.text}
            </p>
            {children}
        </div>
    );
}
