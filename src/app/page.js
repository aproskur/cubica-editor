'use client'
import Sidebar from './components/Sidebar'
import EditorScreen from './components/EditorScreen'
import styled from 'styled-components'
import { SidebarProvider } from 'src/app/SidebarContext.js';
import { EditMenuProvider } from 'src/app/EditMenuContext.js';

const Main = styled.main`
display: flex;
`;

export default function Home() {


  return (
    <Main>
      <SidebarProvider>
        <Sidebar />
        <EditMenuProvider>
          <EditorScreen />
        </EditMenuProvider>
      </SidebarProvider>
    </Main>
  )
}
