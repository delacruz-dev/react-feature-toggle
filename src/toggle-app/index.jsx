import React, { Component, PropTypes } from 'react';

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
    return {
      toggles: PropTypes.array
    };
  }
  getChildContext() {
    return {
      toggles: toggles
    };
  }
  render() {
    return <ComposedApp {...this.props} toggles={this.context.toggles} />;
  }
};

export { ToggleApp };
