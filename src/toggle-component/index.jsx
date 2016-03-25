import React, { Component, PropTypes } from 'react';

const ToggleComponent = ComposedComponent => class extends Component {
  static get childContextTypes() {
    return {
      toggles: PropTypes.array
    };
  }
  static get displayName() {
    const componentDisplayName =
    ComposedComponent.name ||
    ComposedComponent.displayName ||
    'Component';

    return `Toggled${componentDisplayName}`;
  }
  static get contextTypes() {
    return {
      toggles: PropTypes.array
    };
  }
  getChildContext() {
    return this.toggles ? {
      toggles: this.toggles
    } : {
      toggles: []
    };
  }
  render() {
    return <ComposedComponent {...this.props} toggles={this.context.toggles} />;
  }
};

export { ToggleComponent };
