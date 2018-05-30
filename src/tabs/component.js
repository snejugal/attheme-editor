import NewTab from "../new-tab/component";
import React from "react";

class Tabs extends React.Component {
  handleNewTabClick = () => {
    // TODO
  }

  render () {
    return (
      <div className="tabs">
        <NewTab onClick={this.handleNewTabClick}/>
      </div>
    );
  }
}

export default Tabs;