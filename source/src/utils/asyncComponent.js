import React from 'react';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };
    isUnmount = false;

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          if (!this.isUnmount) {
            this.setState({ Component });
          }
        });
      }
    }

    componentWillUnmount() {
      this.isUnmount = true;
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

export default asyncComponent;
