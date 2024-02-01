import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // State to manage the open/closed state of the EditMenu
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

    // State to store information about the clicked component
    const [clickedComponent, setClickedComponent] = useState(null);

    // State to store the type of color being updated ('background' or 'font')
    const [colorType, setColorType] = useState('');

    // Function to update the type of color being edited
    const updateColor = (type) => {
        setColorType(type);
    };

    // State to store component id , the id of component that should be edited
    const [editTextComponentId, setEditTextComponentId] = useState('');

    // State to store edited text
    const [editedText, setEditedText] = useState('');


    // Function to set  editing
    const editText = (componentId) => {
        setEditTextComponentId(componentId);
    };

    //wrapper Function to set a component to editing mode
    const triggerEditMode = (componentId) => {
        setEditTextComponentId(componentId);
    }

    const [textareaData, setTextareaData] = useState('');

    const updateTextareaData = (data) => {
        setTextareaData(data);
    };

    const handleTextareaSubmit = (id, text) => {
        console.log(`Submitting text ${text} from component with id ${id}`)
        //Exit from Editing stateof the component
        setIsEditMenuOpen(false);
        setEditTextComponentId('');
        updateTextareaData(text);
        //pass component id and a newText somwhere to update the scene component
    }

    const handleTextChange = (id, newText) => {
        console.log(`HANDLE TEXT element with id ${id} CHANGE => CONTEXT`, newText);
        setEditedText(newText); // Update the edited text in the context if needed
        // You can perform additional logic or update state as needed
    }




    // State to store the current background color.
    const [backgroundColor, setBackgroundColor] = useState('#234567');

    // Function to update the background color
    const updateCurrentColor = (newColor) => {
        console.log("CONTEXT newcolor", newColor);
        setBackgroundColor(newColor);
    };


    // Function to toggle the EditMenu and set the clicked component
    const toggleEditMenu = (component) => {
        // Toggle the isEditMenuOpen state
        setIsEditMenuOpen((prev) => !prev);

        // Set the clicked component in the state
        setClickedComponent(component);
    };



    /*
    // Function to handle text editing
    const editText = (text) => {
        setEditedText(text);
    }; */


    //Returns ipdated copy of a scene
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

    // Function to generate a unique ID
    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };


    // Function to add a new component
    const addComponent = (scene, parentComponentId, newComponentType) => {
        console.log(`I AM GOING TO ADD A NEW ${newComponentType}COMPONENT to Compoent ${parentComponentId}!!!!!!!!`);
        const newComponent = {
            component: newComponentType,
            id: generateUniqueId(),
            css: {
                width: '100px',
                height: '40px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
            },
        };

        console.log("ID OF NEW COMPONENT fromAddComponent func", newComponent.id)

        const updatedScene = updateComponentInSceneById(
            scene,
            parentComponentId,
            'children',
            [...scene.children, newComponent]
        );

        console.log("UPDATED SCENE from addComponent func", updatedScene);

        return updatedScene;
    };




    // Provide the values (state and functions) to the components in the context
    return (
        <AppContext.Provider value={{
            isEditMenuOpen,
            toggleEditMenu,
            clickedComponent,
            triggerEditMode,
            editText,
            editTextComponentId,
            handleTextChange,
            handleTextareaSubmit,
            editedText,
            textareaData,
            updateTextareaData,
            updateComponentInSceneById,
            backgroundColor,
            updateCurrentColor,
            deleteComponentInSceneById,
            addComponent,
            colorType,
            updateColor
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to consume the values provided by the AppContex
export const useApp = () => {
    return useContext(AppContext);
};

