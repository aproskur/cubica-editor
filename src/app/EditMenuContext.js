import React, { createContext, useContext, useState } from 'react';

const EditMenuContext = createContext();

export const EditMenuProvider = ({ children }) => {
    // State to manage the open/closed state of the EditMenu
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

    // State to store information about the clicked component
    const [clickedComponent, setClickedComponent] = useState(null);

    // State to store the original background color before any changes
    const [originalBackgroundColor, setOriginalBackgroundColor] = useState('#ffffff');

    // State to store the current background color
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    // Function to update the background color
    const updateBackgroundColor = (newColor) => {
        setBackgroundColor(newColor);
    };

    // Function to set the original background color when the EditMenu is opened
    const setOriginalColor = () => {
        setOriginalBackgroundColor(backgroundColor);
    };

    // Function to toggle the EditMenu and set the clicked component
    const toggleEditMenu = (component) => {
        // Toggle the isEditMenuOpen state
        setIsEditMenuOpen((prev) => !prev);

        // Set the clicked component in the state
        setClickedComponent(component);

        // Set the original background color
        setOriginalColor();
    };

    // State to store edited text
    const [editedText, setEditedText] = useState('');

    // Function to handle text editing
    const editText = (text) => {
        setEditedText(text);
    };

    function updateComponentInSceneById(scene, componentId, fieldName, newData) {
        // Deep copy the scene to avoid mutating the original data
        const updatedScene = JSON.parse(JSON.stringify(scene));

        // Recursive function to find the component with the specified ID and update the field
        function findAndModify(obj) {
            if (obj.id === componentId) {
                // Update the field with new data
                if (fieldName.includes('.')) {
                    // Handle nested properties
                    const nestedProperties = fieldName.split('.');
                    let nestedObj = obj;
                    for (let i = 0; i < nestedProperties.length - 1; i++) {
                        nestedObj = nestedObj[nestedProperties[i]];
                    }
                    nestedObj[nestedProperties[nestedProperties.length - 1]] = newData;
                } else {
                    // Update the field directly
                    obj[fieldName] = newData;
                }
            } else if (obj.children && obj.children.length > 0) {
                // Continue searching recursively in children
                obj.children.forEach((child, index) => {
                    obj.children[index] = findAndModify(child);
                });
            }
            return obj;
        }

        // Start the recursive update from the copied scene
        return findAndModify(updatedScene);
    }



    const deleteComponentInSceneById = (scene, componentId) => {
        // Deep copy the scene to avoid mutating the original data
        const updatedScene = JSON.parse(JSON.stringify(scene));

        // Recursive function to find and remove the component with the specified ID
        function findAndDelete(obj) {
            if (obj.children && obj.children.length > 0) {
                // Remove the component from children if found
                obj.children = obj.children.filter((child) => child.id !== componentId);

                // Continue searching recursively in children
                obj.children.forEach((child) => {
                    findAndDelete(child);
                });
            }
            return obj;
        }

        // Update the scene with the component removed
        const sceneWithoutComponent = findAndDelete(updatedScene);

        return sceneWithoutComponent; // Return the updated scene
    };



    // Provide the values (state and functions) to the components in the context
    return (
        <EditMenuContext.Provider value={{
            isEditMenuOpen,
            toggleEditMenu,
            clickedComponent,
            editText,
            editedText,
            updateComponentInSceneById,
            backgroundColor,
            updateBackgroundColor,
            deleteComponentInSceneById,
        }}>
            {children}
        </EditMenuContext.Provider>
    );
};

// Custom hook to consume the values provided by the EditMenuContext
export const useEditMenu = () => {
    return useContext(EditMenuContext);
};

