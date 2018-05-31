import * as database from "./database/api";
import Container from "./container/component";
import EmptyWorkspace from "./empty-workspace/component";
import Header from "./header/component";
import React from "react";
import Workspace from "./workspace/component";
import { addUpdatee as addLocalizationUpdatee } from "./localization";

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      workplaces: [],
      activeTab: null,
    };
  }

  activeTab = React.createRef()

  componentDidMount = async () => {
    this.setState({
      workplaces: await database.getTabs(),
      activeTab: await database.getActiveTab(),
    });

    addLocalizationUpdatee(() => {
      this.forceUpdate();
    });
  }

  handleTheme = async (theme) => {
    const themeId = await database.createTheme(theme);
    const workplaces = [...this.state.workplaces, themeId];

    database.updateWorkplaces(workplaces);
    database.updateActiveTab(themeId);

    this.setState({
      workplaces,
      activeTab: themeId,
    });
  }

  handleActiveTabChange = (newActiveTab) => {
    database.updateActiveTab(newActiveTab);

    this.setState({
      activeTab: newActiveTab,
    });
  }

  handleNameChange = (name) => {
    this.activeTab.current.updateTitle(name);
  }

  handleClosePrompt = async () => {
    // TODO: confirm closing
    const workplaces = [...this.state.workplaces];
    const currentIndex = workplaces.indexOf(this.state.activeTab);

    workplaces.splice(currentIndex, 1);

    const newActiveTabIndex = Math.min(currentIndex, workplaces.length - 1);
    const activeTab = workplaces[newActiveTabIndex];

    this.setState({
      workplaces,
      activeTab,
    });

    await database.deleteTheme(this.state.activeTab);
    await database.updateWorkplaces(workplaces);
    await database.updateActiveTab(activeTab);
  }

  render () {
    let workspace = null;

    if (this.state.activeTab === -1) {
      workspace = <EmptyWorkspace onTheme={this.handleTheme}/>;
    } else if (this.state.activeTab !== null) {
      workspace = (
        <Workspace
          themeId={this.state.activeTab}
          onNameChange={this.handleNameChange}
          onClosePrompt={this.handleClosePrompt}
        />
      );
    }

    return (
      <React.Fragment>
        <Header
          workplaces={this.state.workplaces}
          activeTab={this.state.activeTab}
          onActiveTabChange={this.handleActiveTabChange}
          activeTabRef={this.activeTab}
        />
        <Container>
          {workspace}
        </Container>
      </React.Fragment>
    );
  }
}

export default App;