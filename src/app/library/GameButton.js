// GameButton.js
import React, { useState, useEffect } from 'react';

export default function GameButton({ onClick, isEditMode, onTextChange, ...props }) {
  const [editedText, setEditedText] = useState(props.text || '');

  useEffect(() => {
    setEditedText(props.text || '');
  }, [props.text]);

  const handleClick = (event) => {
    if (onClick) {
      onClick();
      event.stopPropagation();
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setEditedText(newText);

    if (onTextChange) {
      onTextChange(newText);
    }
  };

  return (
    <div>
      {isEditMode ? (
        <textarea
          value={editedText}
          onChange={handleTextChange}
          onBlur={() => onTextChange(editedText)} // Optionally save changes on blur
        />
      ) : (
        <button key={props.id} style={props.style} onClick={handleClick}>
          {props.text}
        </button>
      )}
    </div>
  );
}
