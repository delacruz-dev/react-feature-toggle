import React, { Component, PropTypes } from 'react';

// Prevent context varaibles
// https://github.com/rackt/react-router/issues/484#issuecomment-131066254
const ToggleApp = (ComposedApp, toggles) => class extends Component {
  constructor(...args){
    super(...args);
  }
  static get displayName() {
    const componentDisplayName =
    ComposedApp.name ||
    ComposedApp.displayName ||
    'App';

    return `Toggled${componentDisplayName}`;
  }
  static get childContextTypes() {
    return Object.assign({}, super.childContextTypes, {
      toggles: PropTypes.object
    });
  }
  getChildContext() {
    return Object.assign({}, (super.getChildContext && super.getChildContext()) || {}, {toggles});
  }
  render() {
    return <ComposedApp {...this.props} />;
  }
};

export { ToggleApp };
