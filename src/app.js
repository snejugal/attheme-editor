import * as database from "./database/api";
import Header from "./header/component";
import React from "react";

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header />
      </React.Fragment>
    );
  }
}

export default App;