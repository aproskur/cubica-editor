import React from 'react';

const GenericComponent = ({ component, props, children }) => {
    const Component = component;
    return <Component {...props}>{children}</Component>;
};

export default GenericComponent;

/*
import React from 'react';
import { createElement } from 'react';

const GenericComponent = ({ type, props, children }) => {
    // Assuming type is a valid component name (e.g., 'button', 'card', etc.)
    return React.createElement(type, props, children);
};

export default GenericComponent;
*/