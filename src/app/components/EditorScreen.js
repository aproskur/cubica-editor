import React from 'react';
import styled from 'styled-components';
import { useSidebar } from 'src/app/SidebarContext.js';
import GameCard from '../library/GameCard.js'
import GameScreen from '../library/GameScreen.js'
import GameButton from '../library/GameButton.js'
import GameImage from '../library/GameImage.js'
import GameText from '../library/GameText.js'
import { createElement } from 'react';
import scene_1 from '../data/scene_cards_topsidebar.json'
import EditMenu from '../components/EditMenu.js';
import { useApp } from '../AppContext.js';
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
      },
      "children": [
        {
          "component": "gameimage",
          "id": "4",
          "src": "./images/vote.jpg",
          "alt": "Game Image",
          "css": {
            "width": "100%",
            "height": "auto",
            "marginTop": "10px"
          }
        },
        {
          "component": "gametext",
          "id": "5",
          "text": "Антарктика - это огромный мир из воды, льда и снега, настолько огромный, что никто из его обитателей, кроме, пожалуй, китов, не представляет его размеров. Кроме гигантского материка,",
          "css": {

          }
        },
        {
          "component": "gamebutton",
          "id": "3",
          "text": "Click me!",
          "css": {
            "width": "100px",
            "height": "40px",
            "backgroundColor": "#4CAF50",
            "color": "#fff",
            "border": "none",
            "borderRadius": "5px",
            "cursor": "pointer",
            "marginTop": "10px"
          }
        }
      ]
    }
  ]
};



const StyledEditorScreen = styled.div`
  height: 100vh;
  width: 96%;
  color: var(--clr-theme-yellow);
  padding: 0.5em;
  transition: width 0.3s, margin-left 0.3s;
`;


export default function EditorScreen(props) {

  const [scene, setScene] = useState(test);

  const { isEditMenuOpen,
    toggleEditMenu,
    updateComponentInSceneById,
    deleteComponentInSceneById,
    addComponent
  } = useApp();

  const handleComponentClick = (component) => {
    console.log(`log from "handleCOmponentClicked" COMPONENT CLICKED: ${component.name} (ID: ${component.id})`);
    toggleEditMenu(component);
  };

  // Function to update the text in the scene
  const updateText = (componentId, newText) => {
    console.log('from updateTExt in Editor Screen: Updated Component ID:', componentId);
    console.log('from updateTExt in Editor Screen: New Text:', newText);
    const updatedScene = updateComponentInSceneById(scene, componentId, 'text', newText);
    setScene(updatedScene);
  };

  const updateColor = (componentId, newColor) => {
    console.log('from updateColor in Editor Screen: Updated Component ID:', componentId);
    console.log('from updateColor in Editor Screen: NewColor:', newColor);
    const updatedScene = updateComponentInSceneById(scene, componentId, 'css.backgroundColor', newColor);
    console.log('UPDATED SCENE!!!!!!:', updatedScene);
    setScene(updatedScene);
  };

  const deleteComponent = (componentId) => {
    console.log('from delete comp in Editor Screen: Delete Component ID:', componentId);
    const updatedScene = deleteComponentInSceneById(scene, componentId);
    setScene(updatedScene);
  };

  const addChildComponent = (componentId, newComponentType) => {
    console.log('from add comp in Editor Screen: Adding child comp into comp ID:', componentId);
    const updatedScene = addComponent(scene, componentId, newComponentType);
    setScene(updatedScene);
  }


  //The renderComponent function recursively renders components based on the provided JSON structure. 
  //It uses a componentMap to map component names to React components

  const renderComponent = (c) => {
    const child_comps_arr = c.children || [];
    const ch = child_comps_arr.map((x) => renderComponent(x));

    const componentMap = {
      gamescreen: GameScreen,
      card: GameCard,
      gamebutton: GameButton,
      gameimage: GameImage,
      gametext: GameText,
    };

    const Component = componentMap[c.component];

    if (Component) {
      const { css, text, id, src, alt, content } = c;
      const props = {
        style: css,
        onClick: () => handleComponentClick({ id, name: c.component, css }),
        text,
        id,
        src,
        alt,
        content,
      };
      //The createElement function is used to dynamically create React elements based on the component type. 
      //CreateElement is a REACT function, from react library
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
      <EditMenu isOpen={isEditMenuOpen}
        onToggleMenu={toggleEditMenu}
        updateTextCallback={updateText}
        updateBackgroundCallback={updateColor}
        deleteComponentCallback={deleteComponent}
        addComponentCallback={addChildComponent} />
    </StyledEditorScreen>
  );
}

