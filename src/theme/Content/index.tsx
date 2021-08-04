import React from "react";

class Content extends React.Component {
  render() {
    const { children } = this.props;
    return <div id="content">{children}</div>;
  }
}

export default Content;
