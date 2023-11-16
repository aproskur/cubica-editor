import React, { useState } from 'react';
import styled, { withConfig } from 'styled-components';
import Button from './Button';
import { useSidebar } from 'src/app/SidebarContext.js';

const StyledSidebar = styled.div`
  height: 100vh;
  width: 5%;
  top: 0;
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
`;


export default function Sidebar(props) {




  return (
    <StyledSidebar>
      <div className="content-container">
        <p>Content here</p>
        {/* future components here */}
      </div>
    </StyledSidebar>
  );
}










