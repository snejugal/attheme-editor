import * as database from "./database/api";
import EmptyWorkspace from "./empty-workspace/component";
import Header from "./header/component";
import React from "react";
import { addUpdatee as addLocalizationUpdatee } from "./localization";

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

    addLocalizationUpdatee(() => {
      this.forceUpdate();
    });
  }

  render () {
    return (
      <React.Fragment>
        <Header
          workplaces={this.state.workplaces}
          activeTab={this.state.activeTab}
        />
        {
          this.state.activeTab === -1
            ? <EmptyWorkspace/>
            : null
        }
      </React.Fragment>
    );
  }
}

export default App;