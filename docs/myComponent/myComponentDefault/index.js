import React, { Component, PropTypes } from 'react';

export default class MyComponentDefault extends Component {
  static get displayName() {
    return 'myComponentDefault';
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
        <h1>My Component variation Default</h1>
        <div>{this.props.title}</div>
        <div>{this.props.subtitle}</div>
      </article>
    );
  }
}
