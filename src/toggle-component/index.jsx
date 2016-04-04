import React, { Component, PropTypes } from 'react';

const ToggleComponent = (def, ...toggled) => class ToggleComponent extends Component {
  constructor(...args) {
    super(...args);
    this._toggles = this.context.toggles || {};
  }
  static get childContextTypes() {
    return Object.assign({}, super.childContextTypes, {
      toggles: PropTypes.object
    });
  }
  getChildContext() {
    return (super.getChildContext && super.getChildContext()) || { toggles: {} };
  }
  static get contextTypes() {
    return {
      toggles: PropTypes.object
    };
  }
  render() {
    const Toggle = toggled.reduce( (actual, t) => {
      return Object.keys(this._toggles).find(k => k === t.displayName) ? t : actual;
    }, def);

    const props = Object.assign({}, this.props, this._toggles[Toggle.displayName] && this._toggles[Toggle.displayName].props);
    return <Toggle {...props} />;
  }
};

// Pollyfill
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

export { ToggleComponent };
