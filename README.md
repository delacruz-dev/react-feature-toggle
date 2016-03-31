# react-feature-toggle

React Feature Toggle is a [Higher Order Component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) for helping you to implement [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html).

## What is a feature toggle?
**_Continuous deployment_** is the process of testing, integrating, and deploying software in rapid cycles in order to deliver bug fixes and new features to customers as quickly as possible. It gained popular acceptance as a cornerstone of extreme programming and agile development. It is very popular among Software as a Service providers.

A **_feature toggle_** system allows you to integrate features into your codebase even before they're finished and ready to release. During development, the features are toggled off by default. In order to turn them on, you must enable them manually. Using this method, you can deploy unfinished or untested changes into your production system without interfering with the user experience.

Feature toggles can allow software integration cycles that run in weeks, days, or even hours, as opposed to months or years. They are an essential component in a broader continuous integration system.
([via](https://github.com/ericelliott/feature-toggle))

## Installation
```
$ npm install --save react-feature-toggle
```

## How to use it
Assuming that you have an application that renders a list of components. Each item of the list is a **MyComponent** react component. It receives two props: a `title` and a `subtitle`:

```javascript
import MyComponent from './myComponent';
import React, { Component } from 'react';

export default class MyComponentList extends Component {
  render() {
    return (
      <div className='row'>
        <MyComponent title={'First Component'} subtitle={'This text is not overwritten by the toggle'}/>
        ...
        <MyComponent title={'Nth Component'} subtitle={'This text is not overwritten by the toggle'} />
      </div>
    );
  }
}
```
Please check the [docs](https://github.com/danderu/react-feature-toggle/tree/master/docs) folder for reference.

### Recommended folder structure
Let's say you would like to test a couple of variations: **myComponentA** and **myComponentB**. In order to do so, I recommend you to create the following file structure:

```
├── myComponent
│   ├── index.js
│   ├── myComponentA
│   │   └── index.js
│   ├── myComponentB
│   │   └── index.js
│   └── myComponentDefault
│       └── index.js
```
The folder names are not important. What is important is to have a nice folder structure that allows you to test easily without having to modify the rest of your application. And once you have a winner variation, discard the others just removing files and folders.

You can work in each variation without knowing that it's going to be part of a feature toggle experiment. Every variation has nothing special. 

Please note that one of them, **myComponentDefault** represents in this example your current version of the component, already in production.

### ToggleComponent
You must implement your toggle in the `index.js` file located at the root of your component folder.

```javascript
// Require the default component and each of its variations
import MyComponentA from './myComponentA';
import MyComponentB from './myComponentB';
import MyComponentDefault from './myComponentDefault';
import { ToggleComponent } from 'react-feature-toggle';

// This is the place where you activate the toggle for your component.
// Provide a default component as a first component, and a list of arbitrary
// variations. React Feature Toggle will activate the variation using the display
// name of each variation, so be consistent with it.
export default ToggleComponent(MyComponentDefault, MyComponentA, MyComponentB);
```

The `ToggleComponent` is a higher order component that receives a default component as a first argument and a list of arbitrary number of variations.

This HOC works with the context. It looks for a `toggles` object and checks if any of the *display names* of the provided components matches with the display name provided in the `toggles` object and returns it as the selected component.

### The `toggles` object

The `toggles` object may have a structure similar to the following one:

```javascript
{
  myComponentA: {
    props: {
      title: 'Variation A title'
    }
  },
  anotherComponent: {}
}
```
Each key in the object literal may or not have an object as a value with a `props` property. This property will be merged with the actual `props` of the component, adding the missing props or replacing the existing ones. This is also part of the work of our `ToggleComponent` friend.

Please notice that you only need to wrap your toggled component with the `ToggleComponent`, not the rest of your application's components, and the organic components using it neither. Please review the `docs` folder for a full example.

## ToggleApp
At the top level of your application, you must wrap your app with the higher order component `ToggleApp`:

```javascript
import { ToggleApp } from 'react-feature-toggle';
...
const MyToggledApp = ToggleApp(MyApp, toggles);
```

The way to provide the array of toggles is up to you, but keep in mind that the user of your app will need to provide the toggles somehow. In the following example, I'm using an array of _experiments_ and a function to decide which experiment I'm going to send to the current user. Keep in mind that it's not the same to define an experiment and its variations than deciding which one of the variations you will send to every of your users. This work has to be done at the entry point of your application. And also, for **isomorphic** (or universal) apps, the variation must be the same in the server side and in the client side.

```javascript

// Define somewhere an array of your experiments with
// its variations. Each variation must match one of your
// components' display names.
const experiments = [{
  myComponent: {
    variations: [{
      name: 'myComponentDefault'
    }, {
      name: 'myComponentA',
      force: false,
      props: {
        title: 'Toggled title'
      }
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
        // This is not part of react-feature-toggles, but you may want to
        // implement in your application the ability to force one of the variations. 
        // i.e. If you already know which one is the winner, but you can't deploy
        // until tomorrow
        const forced = e[p].variations.find(v => v.force);
        return forced || e[p].variations[Math.floor(Math.random() * e[p].variations.length)];
    });
  })
  .reduce((prev, curr) => curr)
  .reduce((prev, curr) => {
    prev[curr.name] = curr.props ? {props: curr.props} : {};
    return prev;
  }, {});
};

// Wrap your application into the ToggleApp component and provide an object
// with the active toggles for this request.
const MyToggledApp = ToggleApp(MyApp, chooseToggle());

ReactDom.render(<MyToggledApp />, document.getElementById('main'));
```

Please review the `docs` folder for a complete example.
