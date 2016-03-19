/* eslint no-undef:0 */
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import MyComponent from './myComponent';

ReactDom.render(<MyComponent promise={
  new Promise(resolve => {
    resolve([{myToggle: true}]);
  })
}
/>, document.getElementById('main'));
