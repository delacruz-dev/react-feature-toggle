import { ReactToggle } from "../src";
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    let myToggle = this.props.toggles.find(t => {
      let {myToggle} = t;
      return myToggle
    });

    if (!myToggle)
      return <div>Toggle not active</div>;
    return <div>Toggle active</div>;
  }
}

export default ReactToggle(MyComponent);
