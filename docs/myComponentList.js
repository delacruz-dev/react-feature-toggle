/* eslint react/prop-types: 0 new-cap: 0 */
import MyComponent from './myComponent';
import React, { Component } from 'react';

class MyComponentList extends Component {
  constructor(...args){
    super(...args);
  }
  render() {
    return (<div>
      <MyComponent />
      <MyComponent />
      <MyComponent />
      <MyComponent />
    </div>);
  }
}

export default MyComponentList;
