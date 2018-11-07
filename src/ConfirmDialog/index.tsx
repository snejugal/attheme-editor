import Dialog from "../Dialog";
import React from "react";
import localization from "../localization";

interface Props {
  children: React.ReactNode;
  onDismiss?(): void;
  onConfirm(): void;
  onClose(): void;
  isDangerous?: boolean;
}

export class ConfirmDialog extends React.Component<Props> {
  static defaultProps = {
    isDangerous: false,
  };

  render() {
    return (
      <Dialog
        onDismiss={this.props.onDismiss}
        onClose={this.props.onClose}
        buttons={[
          {
            caption: localization.confirmDialog.yes,
            onClick: this.props.onConfirm,
            shouldCloseAfterClick: true,
            isDangerous: this.props.isDangerous,
          },
          {
            caption: localization.confirmDialog.no,
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
