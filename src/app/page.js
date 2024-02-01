'use client'
import Sidebar from './components/Sidebar'
import EditorScreen from './components/EditorScreen'
import styled from 'styled-components'
import { AppProvider } from 'src/app/AppContext.js';

const Main = styled.main`
display: flex;
`;

export default function Home() {


  return (
    <Main>
      <AppProvider>
        <Sidebar />
        <EditorScreen />
      </AppProvider>
    </Main>
  )
}
