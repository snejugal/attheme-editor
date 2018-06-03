import "./styles.scss";

import Button from "../button/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Heading from "../heading/component";
import PropTypes from "prop-types";
import React from "react";
import RgbInput from "../rgb-input/component";
import localization from "../localization";

class VariableEditor extends React.Component {
  static propTypes = {
    variable: PropTypes.string.isRequired,
    color: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      color: this.props.color,
    };
  }

  handleRgbChange = ({ channel, value }) => this.setState({
    color: {
      ...this.state.color,
      [channel]: value,
    },
  });

  handleSave = () => this.props.onSave(this.state.color)

  render () {
    const colorPreviewStyle = {
      backgroundColor: Color.cssRgb(this.state.color),
    };

    return (
      <Dialog
        onDismiss={this.props.onCancel}
        buttons={
          <React.Fragment>
            <Button onClick={this.handleSave}>
              {localization.variableEditor_save()}
            </Button>
            <Button onClick={this.props.onCancel}>
              {localization.variableEditor_cancel()}
            </Button>
          </React.Fragment>
        }
      >
        <div className="variableEditor_preview -outer">
          <div
            className="variableEditor_preview -inner"
            style={colorPreviewStyle}
          />
        </div>
        <Heading level={3} className="variableEditor_title">
          {this.props.variable}
        </Heading>
        <RgbInput color={this.state.color} onChange={this.handleRgbChange}/>
      </Dialog>
    );
  }
}

export default VariableEditor;