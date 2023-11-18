import React, { useState } from 'react';

// CardComponent is a functional component that represents a card element.
// It takes children, onClick, and other props as parameters.

// Using the spread operator ...props in the function parameters allows me 
// to collect all the remaining properties into the props object. 
// This is a concise way to handle multiple properties without explicitly specifying each one in the function signature.
function CardComponent({ children, onClick, editable, onTextChange, ...props }) {

    // State to manage the edited text
    const [editedText, setEditedText] = useState(props.text || '');

    // handleClick is a function that is called when the card is clicked.
    const handleClick = (event) => {
        // If onClick is provided as a prop, call it.
        if (onClick) {
            onClick();
            // To avoid click on the elements that are stacked under.
            event.stopPropagation();
        }
    };

    // handleTextChange is a function that is called when the text in the textarea changes.
    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    // handleBlur is a function that is called when the textarea loses focus.
    const handleBlur = () => {
        // If onTextChange is provided as a prop, call it with the edited text.
        if (onTextChange) {
            onTextChange(editedText);
        }
    };

    return (
        <div key={props.id} style={props.style} onClick={handleClick}>
            {editable ? (
                // Render a textarea for editing the text when editable is true.
                <textarea
                    value={editedText}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                // Render the text in a paragraph when not in editable mode.
                <div>
                    <p>{props.text}</p>
                </div>
            )}
            {children}
        </div>
    );
}

export default CardComponent;
