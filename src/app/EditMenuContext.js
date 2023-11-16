import React, { createContext, useContext, useState } from 'react';

const EditMenuContext = createContext();

export const EditMenuProvider = ({ children }) => {
    // State to manage the open/closed state of the EditMenu
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);


    // State to store information about the clicked component
    const [clickedComponent, setClickedComponent] = useState(null);

    // Function to toggle the EditMenu and set the clicked component
    const toggleEditMenu = (component) => {
        // Toggle the isEditMenuOpen state
        setIsEditMenuOpen((prev) => !prev);

        // Set the clicked component in the state
        console.log("Comonent, passed to toggleEditMenu, for further passing to setClickedComponent", component)
        setClickedComponent(component);

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
                obj[fieldName] = newData;
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


    // Provide the values (state and functions) to the components in the context
    return (
        <EditMenuContext.Provider value={{ isEditMenuOpen, toggleEditMenu, clickedComponent, editText, editedText, updateComponentInSceneById }}>
            {children}
        </EditMenuContext.Provider>
    );
};

// Custom hook to consume the values provided by the EditMenuContext
export const useEditMenu = () => {
    return useContext(EditMenuContext);
};

