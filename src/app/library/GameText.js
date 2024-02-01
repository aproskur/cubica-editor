'use client'
import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';

export default function GameText({ onClick, children, ...props }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const { editTextComponentId, handleTextChange, handleTextareaSubmit, textareaData, updateTextareadat } = useApp();

    useEffect(() => {
        setIsEditMode(props.id === editTextComponentId);
    }, [props.id, editTextComponentId]);

    const handleClick = (event) => {
        if (onClick) {
            onClick();
            event.stopPropagation();
        }
    };

    const handleBlur = (event) => {
        // Other logic

        // Call handleTextareaSubmit with the ID and new text
        handleTextareaSubmit(props.id, event.target.value);
    };

    const handleKeyDown = (event) => {
        // Check if the key pressed is Enter
        if (event.key === 'Enter') {
            // Call handleTextareaSubmit with the ID and new text
            handleTextareaSubmit(props.id, event.target.value);
        }
    };

    return (
        <div>
            {isEditMode ? (
                // Render textarea for editing when in edit mode
                <textarea
                    defaultValue={props.text}
                    onChange={(e) => handleTextChange(props.id, e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                // Render normal text when not in edit mode
                <p key={props.id} style={props.style} onClick={handleClick}>
                    {props.text}
                </p>
            )}
            {children}
        </div>
    );
}

