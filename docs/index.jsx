/* eslint no-undef:0 */
/* eslint new-cap:0 */
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import MyComponentList from './myComponentList';
import { ToggleApp } from '../src';

class MyApp extends Component {
  constructor(...args){
    super(...args);
  }
  render() {
    return <MyComponentList />;
  }
}

// Define somewhere an array of your experiments with
// its variations. Each variation must match one of your
// components' display names.
const experiments = [{
  myComponent: {
    variations: [{
      name: 'myComponentDefault',
      props: {
        title: 'This text is provided by the toggle object'
      }
    }, {
      name: 'myComponentA',
      force: false
    }, {
      name: 'myComponentB'
    }]
  },

  anotherComponent: {
    variations: [{
      name: 'A'
    }, {
      name: 'B'
    }]
  }
}];

// Then, in the entry point of your application, apply some logic to decide which of
// the variations you are going to set for the current user.
const chooseToggle = () => {
  return experiments.map(e => {
    return Object.keys(e).filter(p => !!e[p].variations)
      .map(p => {
      const forced = e[p].variations.find(v => v.force);
      return forced || e[p].variations[Math.floor(Math.random() * e[p].variations.length)];
    });
  })
  .reduce((prev, curr) => curr)
  .reduce((prev, curr) => {
    prev[curr.name] = curr.props ? curr.props : {};
    return prev;
  }, {});
};

// Wrap your application into the ToggleApp component and provide an object
// with the active toggles for this request.
const MyToggledApp = ToggleApp(MyApp, chooseToggle());

ReactDom.render(<MyToggledApp />, document.getElementById('main'));
