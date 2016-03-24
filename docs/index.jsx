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

new Promise(resolve => {
  resolve([{myToggle: false}]);
})
.then(toggles => {
  const MyToggledApp = ToggleApp(MyApp, toggles);
  ReactDom.render(<MyToggledApp />, document.getElementById('main'));
});
