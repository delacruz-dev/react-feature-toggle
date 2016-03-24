/* eslint react/prop-types: 0 new-cap: 0 */
import { ToggleComponent } from '../src';
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(...args){
    super(...args);
  }
  render() {
    let myToggle = this.props.toggles && this.props.toggles.find(t => {
      let {myToggle} = t;
      return myToggle;
    });

    if (!myToggle){
      return <div>Toggle not active</div>;
    }
    return <div>Toggle active</div>;
  }
}

export default ToggleComponent(MyComponent);
