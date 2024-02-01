import React, { useState, useEffect } from 'react';

// CardComponent is a functional component that represents a card element.
// It takes children, onClick, and other props as parameters.

// Using the spread operator ...props in the function parameters allows me 
// to collect all the remaining properties into the props object. 
// This is a concise way to handle multiple properties without explicitly specifying each one in the function signature.
function CardComponent({ children, onClick, editable, onTextChange, style, ...props }) {
    const [editedText, setEditedText] = useState(props.text || '');
    const [editMode, setEditMode] = useState(false);


    const handleClick = (event) => {
        if (onClick) {
            onClick();
            event.stopPropagation();
        }
    };

    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleBlur = () => {
        if (onTextChange) {
            onTextChange(editedText);
        }
    };

    return (
        <div key={props.id} style={style} onClick={handleClick}>
            {editMode ? (
                <textarea
                    value={editedText}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    autoFocus={editMode} // Only autoFocus when editable is true
                    className="editable-textarea" // Add a class for styling
                />
            ) : (
                <div>
                    <p>{props.text}</p>
                </div>
            )}
            {children}
        </div>
    );
}

export default CardComponent;

