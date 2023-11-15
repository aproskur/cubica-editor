import React from 'react';
import styled from 'styled-components';
import { useSidebar } from 'src/app/SidebarContext.js';
import GameCard from '/home/gpr/anna/ReactProjects/cubica-editor/src/app/library/GameCard.js'
import GameScreen from '/home/gpr/anna/ReactProjects/cubica-editor/src/app/library/GameScreen.js'
import GenericComponent from '/home/gpr/anna/ReactProjects/cubica-editor/src/app/library/GenericComponent.js'
import { createElement } from 'react';
import scene_1 from '/home/gpr/anna/ReactProjects/cubica-editor/src/data/scene_cards_topsidebar.json'




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

const StyledEditorScreen = styled.div
  .withConfig({ shouldForwardProp: prop => !['isFixed', 'isSidebarFixed'].includes(prop) })`
  height: 100vh;
  width: ${props => (props.isSidebarFixed ? '93%' : '96%')};
  margin-left: ${props => (props.isSidebarFixed ? '7%' : '0')};
  color: var(--clr-theme-yellow);
  padding: 0.5em;
  transition: width 0.3s, margin-left 0.3s;
`;

export default function EditorScreen(props) {

  const { isFixed } = useSidebar(); // get isFixed variable from the context
  console.log("Editor Screen. Variable IsFixed");
  console.log(isFixed);


  const renderComponent = (c) => {
    const child_comps_arr = c.children || [];
    const ch = child_comps_arr.map(x => renderComponent(x));
    if (c.component === "gamescreen") {
      const styles = c.css
      const r = createElement(GameScreen, { style: styles }, ch)
      console.log("GS RET")
      console.log(r)
      return r
    }
    if (c.component === "button") {
      const styles = c.css
      return createElement(GameButton, { style: styles, text: c.text, id: c.id }, ch)
    }
    if (c.component === "card") {
      const styles = c.css
      return createElement(GameCard, { style: styles, text: c.text, id: c.id }, ch)
    } if (c.component === "sidebar") {
      console.log("DRAWING TOPSIDEBAR");
      const styles = c.css;
      return createElement(GameSidebar, { style: styles }, ch)
    }
    if (c.component === "score") {
      console.log("Iam drawing score")
      const styles = c.css
      return createElement(GameScoreElement, { style: styles, text: c.text, id: c.id }, ch)
    }
    if (c.component === "label") {
      console.log("I am drawin label")
      const styles = c.css;
      return createElement(GameLabel, { style: styles, text: c.text }, ch)


    }
    if (c.component === "footer") {
      console.log("I am drawin label")
      const styles = c.css;
      return createElement(GameFooter, { style: styles, text: c.text }, ch)


    }
    if (c.component === "cardscontainer") {
      const styles = c.css
      return createElement(GameCardsContainer, { style: styles }, ch)
    }

    else {
      console.log("eRROR")
      console.log(c.component)
      const styles = c.css
      const htmlTag = c.component
      return createElement(htmlTag, { style: styles }, [ch, c.text])
    }
  }


  const renderGenericComponent = (c) => {
    const child_comps_arr = c.children || [];
    const ch = child_comps_arr.map((x, index) => (
      <GenericComponent key={index} component={x.component} props={x} children={renderComponent(x)} />
    ));

    return (
      <GenericComponent component={c.component} props={{ style: c.css, text: c.text, id: c.id }}>
        {ch}
      </GenericComponent>
    );
  };

  /*
  const renderGenericComponent = (data) => {
    const { component, css, text, id, children } = data;
    return (
      <GenericComponent
        type={component}
        props={{ style: css, text, id }}
      >
        {children && children.map((child, index) => (
          <GenericComponent
            key={index}
            type={child.component}
            props={{ style: child.css, text: child.text, id: child.id }}
          >
            {renderGenericComponent(child)} {}
          </GenericComponent>
        ))}
      </GenericComponent>
    );
  };
*/

  return (
    <StyledEditorScreen isSidebarFixed={isFixed}>
      {renderComponent(test)}
    </StyledEditorScreen>
  );
}


