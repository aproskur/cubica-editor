'use client'
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: var(--clr-bgr-dark);
  color: var(--clr-text);
  border: 1px solid var(--clr-theme-yellow);
  border-radius: 5px;
  padding: 5px 10px;
  text-transform: uppercase;
`;

const Button = ({ onClick, text, className }) => (
  <StyledButton
    onClick={onClick}
    className={className}
  >
    {text}
  </StyledButton>
);

export default Button;
