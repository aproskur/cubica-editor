import React from 'react';

export default function GameImage({ onClick, ...props }) {

    const handleClick = (event) => {
        if (onClick) {
            onClick();
            event.stopPropagation();
        }
    };

    return (
        <img key={props.id} src={props.src} alt={props.alt} style={props.style} onClick={handleClick} />
    );
}
