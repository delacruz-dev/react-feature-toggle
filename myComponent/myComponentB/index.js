import React, { Component, PropTypes } from 'react';

export default class MyComponentB extends Component {
  static get displayName() {
    return 'myComponentB';
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
        <h1>My Component variation B</h1>
        <div>{this.props.title}</div>
        <div>{this.props.subtitle}</div>
      </article>
    );
  }
}
