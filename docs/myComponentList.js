/* eslint react/prop-types: 0 new-cap: 0 */
import MyComponent from './myComponent';
import React, { Component } from 'react';

class MyComponentList extends Component {
  constructor(...args){
    super(...args);
  }
  render() {
    return (
      <div>
        <MyComponent title={'First Component'} subtitle={'This text is not overwritten by the toggle'}/>
        <MyComponent title={'Second Component'} subtitle={'This text is not overwritten by the toggle'} />
        <MyComponent title={'Third Component'} subtitle={'This text is not overwritten by the toggle'} />
        <MyComponent title={'Fourth Component'} subtitle={'This text is not overwritten by the toggle'} />
      </div>
    );
  }
}

export default MyComponentList;
