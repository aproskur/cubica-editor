import React, { useState } from 'react';
import styled, { withConfig } from 'styled-components';
import Button from './Button';
import { useSidebar } from 'src/app/SidebarContext.js';

const StyledSidebar = styled.div
  .withConfig({ shouldForwardProp: prop => !['isFixed', 'isHovered'].includes(prop) })`
  height: 100vh;
  width: ${props => (props.isFixed ? '7%' : props.isHovered ? '7%' : '1%')};
  position: ${props => (props.isFixed ? 'fixed' : 'relative')};
  top: 0;
  left: ${props => (props.isFixed ? '0' : 'auto')};
  right: ${props => (props.isFixed ? 'auto' : '0')};
  color: var(--clr-theme-yellow);
  border-right: 1px solid var(--clr-theme-yellow-02);
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s, position 0.3s;
  overflow: hidden;

  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content-container {
    display: ${props => (props.isFixed || props.isHovered ? 'block' : 'none')};
  }
`;


export default function Sidebar(props) {
  const { isFixed, setIsFixed, isHovered, setIsHovered } = useSidebar();

  const handleMouseEnter = () => {
    if (!isFixed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isFixed) {
      setIsHovered(false);
    }
  };

  const handleToggleSidebar = () => {
    setIsFixed(!isFixed); // Update the global state
    setIsHovered(false);
  };



  return (
    <StyledSidebar isFixed={isFixed} isHovered={isHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="button-container">
        {isFixed || isHovered ? (
          <Button
            onClick={handleToggleSidebar}
            text={isFixed ? 'Close' : 'Fix'}
            className={isFixed || !isHovered ? 'hidden' : ''}
          />
        ) : null}
      </div>
      <div className="content-container">
        <p>Content here</p>
        {/* future components here */}
      </div>
    </StyledSidebar>
  );
}










