import React from 'react';

export default function GameButton({ onClick, ...props }) {

  // handleClick is a function that is called when the card is clicked.
  const handleClick = (event) => {
    // If onClick is provided as a prop, call it.
    if (onClick) {
      onClick();
      // To avoid click on the elements that are stacked under.
      event.stopPropagation();
    }
  };


  return (
    <button key={props.id} style={props.style} onClick={handleClick}>
      {props.text}
    </button>
  );
}