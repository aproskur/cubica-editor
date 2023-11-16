import React from 'react';

export default function GameScreen({ style, children, onClick, ...props }) {
    const handleClick = (event) => {
        // If onClick is provided as a prop, call it.
        if (onClick) {
            onClick();
            //to avoid click on the elemt that are stacked under
            event.stopPropagation();
        }
    };
    return (
        <div style={style} className="game-screen" onClick={handleClick} {...props}>
            {children}
        </div>
    );
}
