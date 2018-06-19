import "./styles.scss";

import Button from "../button/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Heading from "../heading/component";
import HexInput from "../hex-input/component";
import HslInput from "../hsl-input/component";
import PropTypes from "prop-types";
import React from "react";
import RgbInput from "../rgb-input/component";
import localization from "../localization";
import readFile from "../read-file";

class VariableEditor extends React.Component {
  static propTypes = {
    variable: PropTypes.string.isRequired,
    color: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    wallpaper: PropTypes.string,
  }

  constructor (props) {
    super(props);

    this.state = {
      color: this.props.color,
      wallpaper: this.props.wallpaper,
    };
  }

  filesInput = React.createRef()

  handleRgbaChannelChange = ({ channel, value }) => this.setState({
    color: {
      ...this.state.color,
      [channel]: value,
    },
  });

  handleColorChange = (color) => this.setState({
    color,
  });

  handleSave = () => {
    if (this.state.color) {
      this.props.onSave(this.state.color);
    } else {
      this.props.onSave(this.state.wallpaper);
    }
  }

  handleUploadWallpaperClick = () => this.filesInput.current.click()

  handleFileInputChange = async () => {
    const filesInput = this.filesInput.current;

    if (filesInput.files.length === 0) {
      return;
    }

    const wallpaper = btoa(await readFile(filesInput.files[0]));

    this.setState({
      wallpaper,
      color: null,
    });
  }

  render () {
    const colorPreviewStyle = {
    };

    if (this.state.color) {
      colorPreviewStyle.backgroundColor = Color.createCssRgb(this.state.color);
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
            <Button onClick={this.props.onDelete} isDangerous={true}>
              {localization.variableEditor_delete()}
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
                  src={`data:image/jpg;base64,${this.state.wallpaper}`}
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
              <form noValidate={true}>
                <HexInput
                  color={this.state.color}
                  onAlphaChange={this.handleRgbaChannelChange}
                  onHexChange={this.handleColorChange}
                />
                <RgbInput
                  color={this.state.color}
                  onChange={this.handleRgbaChannelChange}
                />
                <HslInput
                  color={this.state.color}
                  onChange={this.handleColorChange}
                />
              </form>
            )
            : null
        }
        {
          this.props.variable === `chat_wallpaper`
            ? (
              <React.Fragment>
                <Button
                  onClick={this.handleUploadWallpaperClick}
                >
                  Upload an image
                </Button>
                <input
                  hidden={true}
                  type="file"
                  ref={this.filesInput}
                  onChange={this.handleFileInputChange}
                  accept=".jpg,.jpeg"
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