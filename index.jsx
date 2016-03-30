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

const toggles = [
  'myComponentDefault',
  'myComponentA',
  'myComponentB'
];

const chooseToggle = () => {
  return toggles[Math.floor((Math.random() * 2))];
};

const MyToggledApp = ToggleApp(MyApp, {
  [chooseToggle()]: {
    props: {
      title: 'This text is provided by the toggle object'
    }
  }
});

ReactDom.render(<MyToggledApp />, document.getElementById('main'));
