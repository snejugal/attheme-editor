import "./styles.scss";

import Button from "../button/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Heading from "../heading/component";
import HexInput from "../hex-input/component";
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
    wallpaper: PropTypes.string,
  }

  constructor (props) {
    super(props);

    this.state = {
      color: this.props.color,
    };
  }

  handleRgbaChange = ({ channel, value }) => this.setState({
    color: {
      ...this.state.color,
      [channel]: value,
    },
  });

  handleHexChange = (color) => this.setState({
    color,
  });

  handleSave = () => this.props.onSave(this.state.color)

  render () {
    const colorPreviewStyle = {
    };

    if (this.state.color) {
      colorPreviewStyle.backgroundColor = Color.cssRgb(this.state.color);
    }

    let previewOuterClassName = `variableEditor_preview -outer`;

    if (!this.state.color) {
      previewOuterClassName += ` -imageWrapper`;
    }

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
        <div className={previewOuterClassName}>
          {
            this.state.color
              ? (
                <div
                  className="variableEditor_preview -inner"
                  style={colorPreviewStyle}
                />
              )
              : (
                <img
                  className="variableEditor_preview -image"
                  src={`data:image/jpg;base64,${this.props.wallpaper}`}
                  alt=""
                />
              )
          }
        </div>
        <Heading level={3} className="variableEditor_title">
          {this.props.variable}
        </Heading>
        {
          this.state.color
            ? (
              <React.Fragment>
                <HexInput
                  color={this.state.color}
                  onAlphaChange={this.handleRgbaChange}
                  onHexChange={this.handleHexChange}
                />
                <RgbInput
                  color={this.state.color}
                  onChange={this.handleRgbaChange}
                />
              </React.Fragment>
            )
            : null
        }
      </Dialog>
    );
  }
}

export default VariableEditor;