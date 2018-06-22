import "./styles.scss";

import Button from "../button/component";
import Color from "../color";
import Dialog from "../dialog/component";
import Heading from "../heading/component";
import HexInput from "../hex-input/component";
import HslInput from "../hsl-input/component";
import Palettes from "../palettes/component";
import PropTypes from "prop-types";
import React from "react";
import RgbInput from "../rgb-input/component";
import Tabs from "../tabs/component";
import { defaultValues } from "../attheme-variables";
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
    themeColors: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    color: defaultValues.chat_wallpaper,
  };

  constructor (props) {
    super(props);

    this.state = {
      color: this.props.color,
      wallpaper: this.props.wallpaper,
      activeTab: this.props.wallpaper ? `image` : `color-numeric`,
    };
  }

  filesInput = React.createRef();

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
    if (this.state.activeTab === `image` && this.state.wallpaper) {
      this.props.onSave(this.state.wallpaper);
    } else {
      this.props.onSave(this.state.color);
    }
  };

  handleUploadWallpaperClick = () => this.filesInput.current.click();

  handleFileInputChange = async () => {
    const filesInput = this.filesInput.current;

    if (filesInput.files.length === 0) {
      return;
    }

    const wallpaper = btoa(await readFile(filesInput.files[0]));

    this.setState({
      wallpaper,
    });
  };

  handleTabChange = (activeTab) => this.setState({
    activeTab,
  });

  render () {
    const { color } = this.state;

    const colorPreviewStyle = {
      backgroundColor: Color.createCssRgb(color),
    };

    let previewOuterClassName = `variableEditor_preview -outer`;

    if (this.state.activeTab === `image` && this.state.wallpaper) {
      previewOuterClassName += ` -imageWrapper`;
    }

    const tabs = [
      {
        id: `color-numeric`,
        text: localization.variableEditor_colorModelsTab(),
      },
      {
        id: `palettes`,
        text: localization.variableEditor_palettesTab(),
      },
    ];

    if (this.props.variable === `chat_wallpaper`) {
      tabs.unshift(
        {
          id: `image`,
          text: localization.variableEditor_imageTab(),
        },
      );
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
            this.state.activeTab === `image` && this.state.wallpaper
              ? (
                <img
                  className="variableEditor_preview -image"
                  src={`data:image/jpg;base64,${this.state.wallpaper}`}
                  alt=""
                />
              )
              : (
                <div
                  className="variableEditor_preview -inner"
                  style={colorPreviewStyle}
                />
              )
          }
        </div>
        <Heading level={3} className="variableEditor_title">
          {this.props.variable}
        </Heading>
        <Tabs
          tabs={tabs}
          activeTab={this.state.activeTab}
          onChange={this.handleTabChange}
          className="variableEditor_tabs"
        />
        {
          this.state.activeTab === `color-numeric` && (
            <form noValidate={true}>
              <HexInput
                color={color}
                onAlphaChange={this.handleRgbaChannelChange}
                onHexChange={this.handleColorChange}
              />
              <RgbInput
                color={color}
                onChange={this.handleRgbaChannelChange}
              />
              <HslInput
                color={color}
                onChange={this.handleColorChange}
              />
            </form>
          )
        }
        {
          this.state.activeTab === `image` && (
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
        }
        {
          this.state.activeTab === `palettes` && (
            <Palettes
              onChange={this.handleColorChange}
              themeColors={this.props.themeColors}
              alpha={this.state.color.alpha}
            />
          )
        }
      </Dialog>
    );
  }
}

export default VariableEditor;