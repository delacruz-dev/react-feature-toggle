import React, { Component, PropTypes } from 'react';

export default class MyComponentA extends Component {
  static get displayName() {
    return 'myComponentA';
  }
  static get propTypes() {
    return {
      title: PropTypes.string,
      subtitle: PropTypes.string
    };
  }
  render() {
    return (
      <article>
        <h1>My Component variation A</h1>
        <div>Toggle props: # {this.props.title}</div>
        <div>Original props: # {this.props.subtitle}</div>
      </article>
    );
  }
}
