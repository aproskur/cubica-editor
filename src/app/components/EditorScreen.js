import React from 'react';
import styled from 'styled-components';
import { useSidebar } from 'src/app/SidebarContext.js';
import GameCard from '../library/GameCard.js'
import GameScreen from '../library/GameScreen.js'
import { createElement } from 'react';
import scene_1 from '../data/scene_cards_topsidebar.json'
import EditMenu from '../components/EditMenu.js';
import { useEditMenu } from '../EditMenuContext.js';
import { useState } from 'react';



const test = {
  "component": "gamescreen",
  "id": "1",
  "css": {
    "display": "grid",
    "gridTemplateColumns": "20% 70% 10%",
    "gridTemplateRows": "20% auto",
    "background": "url('./images/arctic-background.png') no-repeat",
    "backgroundSize": "cover",
    "height": "100vh",
    "width": "100%",
    "backgroundSize": "cover"
  },
  "children": [
    {
      "component": "card",
      "id": "2",
      "text": "Антарктика - это огромный мир из воды, льда и снега, настолько огромный, что никто из его обитателей, кроме, пожалуй, китов, не представляет его размеров. Кроме гигантского материка,",
      "css": {
        "width": "300px",
        "height": "300px",
        "gridColumn": "2",
        "gridRow": "2",
        "padding": "1.25em 1em",
        "backgroundColor": "rgba(162, 217, 247, 0.5)",
        "color": "#fff",
        "fontWeight": "bold",
        "fontSize": "1rem",
        "overflow": "scroll",
      }
    },
  ]
}

const StyledEditorScreen = styled.div`
  height: 100vh;
  width: 96%;
  color: var(--clr-theme-yellow);
  padding: 0.5em;
  transition: width 0.3s, margin-left 0.3s;
`;


export default function EditorScreen(props) {

  const [scene, setScene] = useState(test);

  const { isEditMenuOpen, toggleEditMenu, updateComponentInSceneById } = useEditMenu();

  const handleComponentClick = (component) => {
    //console.log(`COMPONENT CLICKED: ${component.name} (ID: ${component.id})`);
    toggleEditMenu(component);
  };

  // Function to update the text in the scene
  const updateText = (componentId, newText) => {
    console.log('from updateTExt in Editor Screen: Updated Component ID:', componentId);
    console.log('from updateTExt in Editor Screen: New Text:', newText);
    const updatedScene = updateComponentInSceneById(scene, componentId, 'text', newText);
    setScene(updatedScene);
  };


  const renderComponent = (c) => {
    const child_comps_arr = c.children || [];
    const ch = child_comps_arr.map(x => renderComponent(x));

    const componentMap = {
      gamescreen: GameScreen,
      card: GameCard,
    };

    const Component = componentMap[c.component];

    if (Component) {
      const { css, text, id } = c;
      const props = { style: css, onClick: () => handleComponentClick({ id, name: c.component }), text, id };

      return createElement(Component, props, ch);
    } else {
      console.log("ERROR");
      console.log(c.component);
      const styles = c.css;
      const htmlTag = c.component;
      return createElement(htmlTag, { style: styles, onClick: () => handleComponentClick({ id, name: c.component }) }, [ch, c.text]);
    }
  };

  return (
    <StyledEditorScreen>
      <div className="editor-components-container">
        {renderComponent(scene)}
      </div>
      {/* Render the EditMenu component */}
      <EditMenu isOpen={isEditMenuOpen} onToggleMenu={toggleEditMenu} updateTextCallback={updateText} />
    </StyledEditorScreen>
  );
}

