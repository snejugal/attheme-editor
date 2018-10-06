import Button from "../Button";
import Dialog from "../Dialog";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

export class ConfirmDialog extends React.Component {
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
        buttons={<>
          <Button
            onClick={this.handleConfirmed}
            isDangerous={this.props.isDangerous}
          >
            {localization.confirmDialog_yes()}
          </Button>
          <Button onClick={this.handleDismissed}>
            {localization.confirmDialog_no()}
          </Button>
        </>}
      >
        {this.props.children}
      </Dialog>
    );
  }
}

export default ConfirmDialog;
