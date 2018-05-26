import "./styles.scss";

import Logo from "../logo/component";
import React from "react";

class Header extends React.Component {
  render () {
    return (
      <header className="header">
        <Logo/>
      </header>
    );
  }
}

export default Header;