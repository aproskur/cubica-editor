'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Sidebar from './components/Sidebar'
import EditorScreen from './components/EditorScreen'
import styled from 'styled-components'
import { SidebarProvider } from 'src/app/SidebarContext.js';

const Main = styled.main`
display: flex;
`;

export default function Home() {


  return (
    <Main>
      <SidebarProvider>
        <Sidebar/>
        <EditorScreen />
       </SidebarProvider>
    </Main>
  )
}
