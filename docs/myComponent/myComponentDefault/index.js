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
      <div className='col s5 m6'>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>{this.props.title}</span>
            <p>{this.props.subtitle}</p>
          </div>
          <div className='card-action'>
            <a href='#'>This is a link</a>
          </div>
        </div>
      </div>
    );
  }
}
