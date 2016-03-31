# react-feature-toggle

**WARNING** This README.md file is not up to date. Please be patient while I rewrite it with the new API for version ^0.5.0. Meanwhile, follow the example in the docs page.

React Feature Toggle is a proof of concept of a [Higher Order Component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) to implement [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html).

##What is a feature toggle?
**_Continuous deployment_** is the process of testing, integrating, and deploying software in rapid cycles in order to deliver bug fixes and new features to customers as quickly as possible. It gained popular acceptance as a cornerstone of extreme programming and agile development. It is very popular among Software as a Service providers.

A **_feature toggle_** system allows you to integrate features into your codebase even before they're finished and ready to release. During development, the features are toggled off by default. In order to turn them on, you must enable them manually. Using this method, you can deploy unfinished or untested changes into your production system without interfering with the user experience.

Feature toggles can allow software integration cycles that run in weeks, days, or even hours, as opposed to months or years. They are an essential component in a broader continuous integration system.
([via](https://github.com/ericelliott/feature-toggle))

## Installation
```
$ npm install --save react-feature-toggle
```

## How to use it
First of all, create your component as if it were to receive by props an array with feature toggles:

```javascript
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
```

The component will receive a prop named `toggles` with an array of toggles. You are free to implement any object pattern with the information needed to implement your toggle. This may be the simplest configuration possible to activate a simple toggle:

```javascript
[{
  myToggle: true
}]
```

Just keep in mind to be consistent when implementing the feature toggle in your component, and with the object you are sending in the array of toggles.

In the previous example, the component will only make use of `myToggle`... But how does it receive it? This is where `react-feature-toggles` is useful.

React Feature Toggles provides you two HOC: `ToggleApp` and `ToggleComponent`. Let's examine them in detail:

## ToggleComponent
At the component level, just wrap your component into the higher order component `ToggleComponent`:

```javascript
import { ToggleComponent } from 'react-feature-toggle';
...
export default ToggleComponent(MyComponent);
```

This will export your component as a _toggled_ component. What does it mean? Just that it will be wrapped with a Higher Order Component that will receive by context an array of toggles and pass it as props to your component.

Please notice that you only need to wrap your toggled component with the `ToggleComponent`, not the rest of your application's components, and the organic components using it neither. Please review the `docs` folder for a full example.

## ToggleApp
At the top level of your application, you must wrap your app with the higher order component `ToggleApp`:

```javascript
import { ToggleApp } from 'react-feature-toggle';
...
const MyToggledApp = ToggleApp(MyApp, toggles);
```

The way to provide the array of toggles is up to you, but keep in mind that the user of your app will need to provide the toggles somehow. In the following example, I'm providing a `Promise` function that returns an array of feature toggles on being fullfilled. In production, it may be a good idea your togles from a configuration file, or a dedicated service. Also, keep in mind that you might implement some logic to decide which toggle are you activating to every of your users. The following is just for illustrative purpose only:

```javascript
new Promise(resolve => {
  resolve([{myToggle: false}]);
})
.then(toggles => {
  const MyToggledApp = ToggleApp(MyApp, toggles);
  ReactDom.render(<MyToggledApp />, document.getElementById('main'));
});
```

Please review the `docs` folder to get a complete example.
