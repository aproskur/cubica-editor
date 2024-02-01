
import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useApp } from '../AppContext';

const ColorPicker = () => {
    const { updateCurrentColor, clickedComponent } = useApp();
    const [color, setColor] = useState(clickedComponent ? clickedComponent.css.backgroundColor : '#234567');

    // Update the color when backgroundColor changes in the context
    useEffect(() => {
        // Initialize the color with the background color of the clicked component
        if (clickedComponent) {
            setColor(clickedComponent.css.backgroundColor || '#234567');
        }
    }, [clickedComponent]);

    const handleChange = (newColor) => {
        setColor(newColor);
        updateCurrentColor(newColor);
    };

    return <HexColorPicker color={color} onChange={handleChange} />;
};

export default ColorPicker;



