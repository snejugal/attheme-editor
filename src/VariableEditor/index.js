import "./styles.scss";

import Button from "../Button";
import Buttons from "../Buttons";
import { ReactComponent as Check } from "./check.svg";
import Color from "@snejugal/color";
import Dialog from "../Dialog";
import Heading from "../Heading";
import HexInput from "../HexInput";
import Hint from "../Hint";
import HslInput from "../HslInput";
import Palettes from "../Palettes";
import PropTypes from "prop-types";
import React from "react";
import RgbInput from "../RgbInput";
import Tabs from "../Tabs";
import VariablePreview from "../VariablePreview";
import { defaultValues } from "../atthemeVariables";
import localization from "../localization";
import readFile from "../readFile";

let Vibrant;
let WebWorkerQuantizer;

export default class VariableEditor extends React.Component {
  static propTypes = {
    variable: PropTypes.string.isRequired,
    color: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCustomPaletteColorAdd: PropTypes.func.isRequired,
    onCustomPaletteEditStart: PropTypes.func.isRequired,
    stateBackup: PropTypes.object,
    theme: PropTypes.object,
  };

  static defaultProps = {
    color: defaultValues.chat_wallpaper,
    isFromPaletteEditing: false,
  };

  constructor(props) {
    super(props);

    if (this.props.stateBackup) {
      this.state = {
        ...this.props.stateBackup,
      };

      return;
    }

    let activeTab = `color-numeric`;

    if (
      this.props.theme.wallpaper
      && this.props.variable === `chat_wallpaper`
    ) {
      activeTab = `image`;
    }

    this.state = {
      color: this.props.color,
      wallpaper: this.props.theme.wallpaper,
      activeTab,
      wallpaperColors: null,
      isEditingPalette: false,
    };
  }

  filesInput = React.createRef();

  dialog = React.createRef();

  componentDidMount() {
    if (this.state.wallpaper) {
      this.generateWallpaperColors();
    }
  }

  generateWallpaperColors = async () => {
    try {
      if (!Vibrant) {
        Vibrant = (await import(`node-vibrant`)).default;
      }

      if (!WebWorkerQuantizer) {
        ({
          default: WebWorkerQuantizer,
        } = await import(`node-vibrant/lib/quantizer/worker`));
      }
    } catch {
      return;
    }

    const vibrant = new Vibrant(
      `data:image/jpg;base64,${this.state.wallpaper}`,
      {
        quantizer: WebWorkerQuantizer,
        quality: 1,
      },
    );

    const objectPalette = await vibrant.getPalette();
    const arrayPalette = [];

    for (const colorName in objectPalette) {
      if (
        !objectPalette[colorName]
        || objectPalette[colorName].getPopulation() === 0
      ) {
        continue;
      }

      const [red, green, blue] = objectPalette[colorName].getRgb();

      arrayPalette.push({
        name: colorName,
        color: {
          red,
          green,
          blue,
        },
      });
    }

    this.setState({
      wallpaperColors: arrayPalette,
    });
  };

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

    this.generateWallpaperColors();
  };

  handleTabChange = (activeTab) => this.setState({
    activeTab,
  });

  hanldeCustomPaletteEditStart = () => {
    this.setState({
      isEditingPalette: true,
    });

    this.dialog.current.close();
  };

  handleClose = () => {
    if (this.state.isEditingPalette) {
      this.props.onCustomPaletteEditStart({
        backupState: {
          ...this.state,
          isEditingPalette: false,
        },
      });
    } else {
      this.props.onClose();
    }
  };

  render() {
    const { color } = this.state;

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

    let wallpaperColors;

    if (this.state.wallpaperColors) {
      wallpaperColors = this.state.wallpaperColors.map((colorData) => {
        const handleClick = () => {
          this.props.onCustomPaletteColorAdd(colorData);
        };

        const isLight = Color.isLight(colorData.color);

        let className = `palettes_color`;

        if (isLight) {
          className += ` -darkText`;
        }

        const isAlreadyInPalette = this.props.theme.palette.some(
          (customPaletteColor) => (
            typeof customPaletteColor === `object`
            && customPaletteColor.color.red === colorData.color.red
            && customPaletteColor.color.green === colorData.color.green
            && customPaletteColor.color.blue === colorData.color.blue
          ),
        );

        return <Button
          className={className}
          key={colorData.name}
          backgroundColor={Color.createCssRgb(colorData.color)}
          onClick={handleClick}
          isDisabled={isAlreadyInPalette}
        >
          {colorData.name}
          {isAlreadyInPalette && <Check className="icon"/>}
        </Button>;
      });
    }

    const themeColors = [];

    if (this.state.activeTab === `palettes`) {
      const allColors = Object.values(this.props.theme.variables);
      const hexes = allColors.map(({ red, green, blue }) => Color.createHex({
        red,
        green,
        blue,
        alpha: 255,
      }));
      const uniqueHexes = new Set(hexes);

      themeColors.push(...uniqueHexes);
    }

    return (
      <Dialog
        ref={this.dialog}
        onClose={this.handleClose}
        buttons={[
          {
            caption: localization.variableEditor_save(),
            onClick: this.handleSave,
            shouldCloseAfterClick: true,
          },
          {
            caption: localization.variableEditor_cancel(),
            shouldCloseAfterClick: true,
          },
          {
            caption: localization.variableEditor_delete(),
            onClick: this.props.onDelete,
            shouldCloseAfterClick: true,
            isDangerous: true,
          },
        ]}
      >
        <VariablePreview
          theme={this.props.theme}
          variable={this.props.variable}
          currentColor={this.state.color}
          currentWallpaper={this.state.wallpaper}
          shouldShowWallpaper={Boolean(
            this.state.activeTab === `image`
            && this.state.wallpaper,
          )}
        />
        <Heading level={3} className="variableEditor_title">
          {this.props.variable}
        </Heading>
        <Tabs
          tabs={tabs}
          activeTab={this.state.activeTab}
          onChange={this.handleTabChange}
          className="variableEditor_tabs"
        />
        {this.state.activeTab === `color-numeric` && (
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
        )}
        {this.state.activeTab === `image` && <>
          <Buttons className="variableEditor_buttons">
            <Button
              onClick={this.handleUploadWallpaperClick}
            >
              {localization.variableEditor_uploadImage()}
            </Button>
          </Buttons>
          {this.state.wallpaperColors && <>
            <Hint>
              {localization.variableEditor_wallpaperColorsHint()}
            </Hint>
            <div className="palettes">
              {wallpaperColors}
            </div>
          </>}
          <input
            hidden={true}
            type="file"
            ref={this.filesInput}
            onChange={this.handleFileInputChange}
            accept=".jpg,.jpeg"
          />
        </>}
        {this.state.activeTab === `palettes` && (
          <Palettes
            onChange={this.handleColorChange}
            themeColors={themeColors}
            alpha={this.state.color.alpha}
            themeCustomPalette={this.props.theme.palette}
            onCustomPaletteEditStart={this.hanldeCustomPaletteEditStart}
          />
        )}
      </Dialog>
    );
  }
}
