import React from "react";

class LayoutProvider extends React.Component {
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default LayoutProvider;
