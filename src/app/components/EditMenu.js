//The EditMenu component renders options based on the type of the clicked component. 
//It allows editing text, changing background color, and deleting components.
//It uses a color picker (ColorPicker) for changing background color.
//The selected option determines which functionality to trigger.

'use client';
import React from 'react';
import styled from 'styled-components';
import { useApp } from 'src/app/AppContext.js';
import { useState, useEffect } from 'react';
import ColorPicker from 'src/app/components/ColorPicker.js'

const StyledEditMenu = styled.div
    .withConfig({ shouldForwardProp: prop => !['isOpen'].includes(prop) })`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bgr-clr-dark);
    border: 1px solid var(--clr-theme-yellow);
    border-radius: 10px;
    color: var(--clr-text);
    padding: 20px;
    max-width: 80%;
    overflow-y: auto;
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    
`;

const EditMenu = ({ updateTextCallback, updateBackgroundCallback, deleteComponentCallback, addComponentCallback }) => {
    const {
        isEditMenuOpen,
        editedText,
        textareaData,
        triggerEditMode,
        toggleEditMenu,
        clickedComponent,
        updateCurrentColor,
        backgroundColor,
    } = useApp();

    console.log('Textarea Data in EditorMenu:', textareaData);

    // State to manage the selected option
    const [selectedOption, setSelectedOption] = useState(null);


    // Function to handle clicks on EditMenu options
    const handleOptionClick = (option, textareaData) => {
        console.log(`Option clicked: ${option}`);
        console.log('Clicked Component:', clickedComponent);

        // Trigger specific actions based on the selected option
        if (option === 'editText') {
            /*const newText = prompt('Enter new text:');
            console.log('New Text:', newText);*/
            const componentId = clickedComponent.id
            triggerEditMode(componentId);
            console.log("CallingTextCallback");
            console.log(`DATA to pass into  updateTextCallback${componentId} ${textareaData}`);
            updateTextCallback(componentId, textareaData);

        }
        else if (option === 'changeBackgroundColor') {
            const currentColor = clickedComponent.css.backgroundColor
            console.log("Current color", currentColor);
            updateCurrentColor(currentColor) //to update color, when color picker is opened
            console.log('CHANGE BACKGROUND COLOR');
            setSelectedOption('changeBackgroundColor');
            updateBackgroundCallback(clickedComponent.id, backgroundColor);
        }
        else if (option === 'deletecomponent') {
            console.log('DELETE COMPONENT');
            setSelectedOption('deletecomponent');

            deleteComponentCallback(clickedComponent.id);
        }
        else if (option === 'addComponent') {
            console.log('ADD COMPONENT');
            setSelectedOption('addcomponent');
            addComponentCallback(clickedComponent.id, "gamebutton");
        }


        // Don't close the menu immediately; let the user choose the color
        // toggleEditMenu();
    };

    // Function to handle menu clicks
    const handleMenuClick = () => {
        // Close the menu if another option is selected
        if (selectedOption !== null) {
            toggleEditMenu();
            setSelectedOption(null); // Reset the selected option
        }
    };

    return (
        <StyledEditMenu
            isOpen={isEditMenuOpen}
            className="edit-menu"
            onClick={handleMenuClick}
        >
            {/* Render options based on the type of the clicked component */}
            {clickedComponent && (
                <>
                    {selectedOption === 'changeBackgroundColor' && (
                        <ColorPicker />
                    )}
                    {selectedOption !== 'changeBackgroundColor' && (
                        <>
                            {clickedComponent.name === 'gamescreen' && (
                                <>
                                    <div onClick={() => handleOptionClick('gamescreenOption1')}>
                                        Поменять фон
                                    </div>
                                    <div onClick={() => handleOptionClick('gamescreenOption2')}>
                                        Gamescreen Option 2
                                    </div>
                                    <div onClick={() => handleOptionClick('addComponent')}>
                                        Добавить КНОПКУ
                                    </div>
                                    {/* Add more gamescreen options as needed */}
                                </>
                            )}
                            {clickedComponent.name === 'card' && (
                                <>
                                    <div onClick={() => handleOptionClick('editText')}>
                                        Редактировать Текст
                                    </div>
                                    <div onClick={() => handleOptionClick('changeBackgroundColor')}>
                                        Поменять фон
                                    </div>
                                    <div onClick={() => handleOptionClick('deletecomponent')}>
                                        Удалить карточку
                                    </div>
                                    <div onClick={() => handleOptionClick('addComponent')}>
                                        Добавить КНОПКУ
                                    </div>
                                    {/* Add more card options as needed */}
                                </>
                            )}
                            {clickedComponent.name === 'gameimage' && (
                                <>
                                    <div onClick={() => handleOptionClick('gameimageOption1')}>
                                        GameImage Option 1
                                    </div>
                                    <div onClick={() => handleOptionClick('deletecomponent')}>
                                        Удалить картинку
                                    </div>
                                    {/* Add more gameimage options as needed */}
                                </>
                            )}
                            {clickedComponent.name === 'gametext' && (
                                <>
                                    <div onClick={() => handleOptionClick('changeBackgroundColor')}>
                                        Редактировать фон
                                    </div>
                                    <div onClick={() => handleOptionClick('gamescreenOption1')}>
                                        Редактировать цвет текста
                                    </div>
                                    <div onClick={() => handleOptionClick('editText')}>
                                        Редактировать текст
                                    </div>
                                    <div onClick={() => handleOptionClick('deletecomponent')}>
                                        Удалить текст
                                    </div>
                                    {/* Add more gametext options as needed */}
                                </>
                            )}
                            {clickedComponent.name === 'gamebutton' && (
                                <>
                                    <div onClick={() => handleOptionClick('changeBackgroundColor')}>
                                        Редактировать фон
                                    </div>
                                    <div onClick={() => handleOptionClick('editText')}>
                                        Редактировать текст
                                    </div>
                                    <div onClick={() => handleOptionClick('deletecomponent')}>
                                        Удалить кнопку
                                    </div>
                                    {/* Add more gamebutton options as needed */}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </StyledEditMenu>
    );
};

export default EditMenu;
