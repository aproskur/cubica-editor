import React from 'react';



// CardComponent is a functional component that represents a card element.
// It takes children, onClick, and other props as parameters.

//using the spread operator ...props in the function parameters allows me 
//to collect all the remaining properties into the props object. 
//This is a concise way to handle multiple properties without explicitly specifying each one in the function signature.
function CardComponent({ children, onClick, ...props }) {
    // handleClick is a function that is called when the card is clicked.
    const handleClick = (event) => {
        // If onClick is provided as a prop, call it.
        if (onClick) {
            onClick();
            //to avoid click on the elemt that are stacked under
            event.stopPropagation();
        }
    };

    return (
        <div key={props.id} style={props.style} onClick={handleClick} >
            {props.text}
            {children}
        </div>
    );
}

export default CardComponent;