'use client';

import React from 'react';
import styled from 'styled-components';
import { useEditMenu } from 'src/app/EditMenuContext.js';

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
const EditMenu = ({ updateTextCallback }) => {
    const { isEditMenuOpen, toggleEditMenu, clickedComponent } = useEditMenu();


    // Function to handle option clicks
    const handleOptionClick = (option) => {
        console.log('EditMenu - Option clicked:', option);
        console.log('EditMenu - Clicked Component:', clickedComponent);

        if (option === 'editText') {
            const newText = prompt('Enter new text:');
            console.log('EditMenu - New Text:', newText);
            updateTextCallback(clickedComponent.id, newText);
        }

        toggleEditMenu();
    };


    return (
        <StyledEditMenu isOpen={isEditMenuOpen} className="edit-menu">
            {/* Render options based on the type of the clicked component */}
            {clickedComponent && (
                <>
                    {clickedComponent.name === 'gamescreen' && (
                        <>
                            <div onClick={() => handleOptionClick('gamescreenOption1')}>Поменять фон</div>
                            <div onClick={() => handleOptionClick('gamescreenOption2')}>Gamescreen Option 2</div>
                            {/* Add more gamescreen options as needed */}
                        </>
                    )}
                    {clickedComponent.name === 'card' && (
                        <>
                            <div onClick={() => handleOptionClick('editText')}>Редактировать Текст</div>
                            <div onClick={() => handleOptionClick('cardOption2')}>Поменять фон</div>
                            {/* Add more card options as needed */}
                        </>
                    )}
                    {/* Add more cases for other component types if needed */}
                </>
            )}
        </StyledEditMenu>
    );
};


export default EditMenu;
