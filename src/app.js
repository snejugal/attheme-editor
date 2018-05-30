import * as database from "./database/api";
import Header from "./header/component";
import React from "react";

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      workplaces: [],
      activeTab: null,
    };
  }

  componentDidMount = async () => {
    this.setState({
      workplaces: await database.getTabs(),
      activeTab: await database.getActiveTab(),
    });
  }

  render () {
    return (
      <React.Fragment>
        <Header
          workplaces={this.state.workplaces}
          activeTab={this.state.activeTab}
        />
      </React.Fragment>
    );
  }
}

export default App;