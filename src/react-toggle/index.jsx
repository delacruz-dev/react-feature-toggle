import React, { Component } from 'react';

const ReactToggle = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);
    this.state = { toggles: [] };
  }
  static propTypes() {
    return {
      promise: React.PropTypes.func
    }
  }
  componentDidMount() {
    this.props.promise.then(toggles => this.setState({toggles}));
  }
  render() {
    return <ComposedComponent {...this.props} toggles={this.state.toggles} />;
  }
};

export { ReactToggle };
