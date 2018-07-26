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

  state = {
    handleHide: null,
  };

  handleConfirmed = () => this.setState({
    handleHide: this.props.onConfirmed,
  });

  handleDismissed = () => this.setState({
    handleHide: this.props.onDismissed,
  });

  render () {
    return (
      <Dialog
        onDismiss={this.props.onDismissed}
        onHide={this.state.handleHide}
        buttons={
          <React.Fragment>
            <Button
              onClick={this.handleConfirmed}
              isDangerous={this.props.isDangerous}
            >
              {localization.confirmDialog_yes()}
            </Button>
            <Button onClick={this.handleDismissed}>
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
