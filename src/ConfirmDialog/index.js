import Dialog from "../Dialog";
import PropTypes from "prop-types";
import React from "react";
import localization from "../localization";

export class ConfirmDialog extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onDismiss: PropTypes.func,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isDangerous: PropTypes.bool,
  };

  static defaultProps = {
    isDangerous: false,
  };

  render () {
    return (
      <Dialog
        onDismiss={this.props.onDismiss}
        onClose={this.props.onClose}
        buttons={[
          {
            caption: localization.confirmDialog_yes(),
            onClick: this.props.onConfirm,
            shouldCloseAfterClick: true,
            isDangerous: this.props.isDangerous,
          },
          {
            caption: localization.confirmDialog_no(),
            onClick: this.props.onDismiss,
            shouldCloseAfterClick: true,
          },
        ]}
      >
        {this.props.children}
      </Dialog>
    );
  }
}

export default ConfirmDialog;
