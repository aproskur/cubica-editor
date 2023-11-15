import React from 'react';



function CardComponent({ children, ...props }) {


    return (
        <div key={props.id} style={props.style} >
            {props.text}
            {children}
        </div>
    );
}

export default CardComponent;