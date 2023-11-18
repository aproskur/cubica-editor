import { HexColorPicker } from 'react-colorful';
import { useEditMenu } from '../EditMenuContext';
import { useState, useEffect } from 'react';

const ColorPicker = () => {
    const { backgroundColor, updateBackgroundColor, clickedComponent } = useEditMenu();
    const [color, setColor] = useState(backgroundColor);

    // Update the color when backgroundColor changes in the context
    useEffect(() => {
        setColor(backgroundColor);
    }, [backgroundColor, clickedComponent]);

    const handleChange = (newColor) => {
        setColor(newColor);
        updateBackgroundColor(newColor);
    };

    return <HexColorPicker color={color} onChange={handleChange} />;
};

export default ColorPicker;


