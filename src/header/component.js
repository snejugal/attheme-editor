import "./styles.scss";

import Logo from "../logo/component";
import React from "react";
import Tabs from "../tabs/component";

class Header extends React.Component {
  render () {
    return (
      <header className="header">
        <Logo/>
        <Tabs/>
      </header>
    );
  }
}

export default Header;