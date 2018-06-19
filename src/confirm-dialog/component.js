import Button from "../button/component";
import Dialog from "../dialog/component";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

class ConfirmDialog extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onDismissed: PropTypes.func.isRequired,
    onConfirmed: PropTypes.func.isRequired,
    isDangerous: PropTypes.bool,
  };

  static defaultProps = {
    isDangerous: false,
  };

  render () {
    return (
      <Dialog
        onDismiss={this.props.onDismissed}
        buttons={
          <React.Fragment>
            <Button
              onClick={this.props.onConfirmed}
              isDangerous={this.props.isDangerous}
            >
              {localization.confirmDialog_yes()}
            </Button>
            <Button onClick={this.props.onDismissed}>
              {localization.confirmDialog_no()}
            </Button>
          </React.Fragment>
        }
      >
        {this.props.children}
      </Dialog>
    );
  }
}

export default ConfirmDialog;