import "./styles.scss";

import Button from "../Button";
import Buttons from "../Buttons";
import { ReactComponent as Check } from "./check.svg";
import { isLight, createCssRgb, createHex } from "@snejugal/color";
import Dialog from "../Dialog";
import Heading from "../Heading";
import ColorEditor from "../ColorEditor";
import Hint from "../Hint";
import Palettes from "../Palettes";
import React from "react";
import Tabs from "../Tabs";
import VariablePreview from "../VariablePreview";
import { defaultValues } from "../atthemeVariables";
import localization from "../localization";
import readFile from "../readFile";
import { Color } from "attheme-js/lib/types";
import prepareFile from "../prepareFile";
import download from "../download";

let Vibrant: VibrantClass;
let WebWorkerQuantizer: Quantizer;

/* eslint-disable quotes */
type TabName = "image" | "gradient" | "colorNumeric" | "palettes";
/* eslint-enable quotes */

interface Props {
  variable: string;
  value?: Color | Gradient;
  mayBeGradient?: boolean;
  onClose(): void;
  onSave(newValue: string | Color | Gradient): void;
  onDelete(): void;
  onCustomPaletteColorAdd(color: PaletteColor): void;
  onCustomPaletteEditStart(message: { backupState: State }): void;
  stateBackup: State | null;
  theme: Theme;
}

export interface State {
  wallpaper?: string;
  color?: Color;
  gradient?: Gradient;
  activeTab: TabName;
  wallpaperColors: PaletteColor[] | null;
  isEditingPalette: boolean;
}

export default class VariableEditor extends React.Component<Props, State> {
  static defaultProps = {
    color: defaultValues.chat_wallpaper,
    isFromPaletteEditing: false,
  };

  constructor(props: Props) {
    super(props);

    console.log(props);

    if (this.props.stateBackup) {
      this.state = {
        ...this.props.stateBackup,
      };

      return;
    }

    let activeTab: TabName = `colorNumeric`;
    let gradient: Gradient | undefined;

    if (this.props.value && `from` in this.props.value) {
      activeTab = `gradient`;
      gradient = this.props.value;
    } else if (
      this.props.variable === `chat_wallpaper` &&
      this.props.theme.wallpaper
    ) {
      activeTab = `image`;
    }

    let color: Color;

    if (this.props.value) {
      if (`red` in this.props.value) {
        color = this.props.value;
      } else {
        color = this.props.value.from;
      }
    } else {
      color = { red: 0, green: 0, blue: 0, alpha: 0 };
    }

    this.state = {
      color,
      wallpaper: this.props.theme.wallpaper,
      gradient,
      activeTab,
      wallpaperColors: null,
      isEditingPalette: false,
    };
  }

  filesInput = React.createRef<HTMLInputElement>();

  dialog = React.createRef<Dialog>();

  componentDidMount() {
    if (this.state.wallpaper && this.props.variable === `chat_wallpaper`) {
      this.generateWallpaperColors();
    }
  }

  generateWallpaperColors = async () => {
    try {
      if (!Vibrant) {
        Vibrant = (await import(`node-vibrant`)).default;
      }

      if (!WebWorkerQuantizer) {
        WebWorkerQuantizer = (await import(`node-vibrant/lib/quantizer/worker`))
          .default;
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
        !objectPalette[colorName] ||
        objectPalette[colorName].getPopulation() === 0
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

  handleColorChange = (color: Color) =>
    this.setState({
      color,
    });

  handleGradientChange = (point: `from` | `to`, color: Color) => {
    this.setState({
      gradient: {
        ...this.state.gradient!,
        [point]: color,
      },
    });
  };

  handleSave = () => {
    if (this.state.activeTab === `image`) {
      this.props.onSave(this.state.wallpaper!);
    } else if (this.state.activeTab === `gradient`) {
      this.props.onSave(this.state.gradient!);
    } else {
      this.props.onSave(this.state.color!);
    }
  };

  handleUploadWallpaperClick = () => this.filesInput.current!.click();

  handleFileInputChange = async () => {
    const filesInput = this.filesInput.current!;

    if (filesInput.files!.length === 0) {
      return;
    }

    const wallpaper = btoa(await readFile(filesInput.files![0]));

    this.setState({
      wallpaper,
    });

    this.generateWallpaperColors();
  };

  handleTabChange = (activeTab: TabName) => {
    const newState = {
      activeTab,
      gradient: this.state.gradient,
    };

    if (activeTab === `gradient` && !this.state.gradient) {
      newState.gradient = {
        from: { ...this.state.color },
        to: { ...this.state.color },
      };
    }

    this.setState(newState);
  };

  hanldeCustomPaletteEditStart = () => {
    this.setState({
      isEditingPalette: true,
    });

    this.dialog.current!.close();
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

  handleDownloadClick = () => {
    const name = `${this.props.theme.name}.jpg`;
    const blob = prepareFile(name, atob(this.state.wallpaper!));

    download(blob, name);
  };

  render() {
    const tabs = [
      {
        id: `colorNumeric`,
        text: localization.variableEditor.colorModelsTab,
      },
      {
        id: `palettes`,
        text: localization.variableEditor.palettesTab,
      },
    ];

    if (this.props.mayBeGradient) {
      tabs.unshift({
        id: `gradient`,
        text: localization.variableEditor.gradientTab,
      });
    }

    if (this.props.variable === `chat_wallpaper`) {
      tabs.unshift({
        id: `image`,
        text: localization.variableEditor.imageTab,
      });
    }

    let wallpaperColors;

    if (this.state.wallpaperColors) {
      wallpaperColors = this.state.wallpaperColors.map(colorData => {
        const handleClick = () => {
          this.props.onCustomPaletteColorAdd(colorData);
        };

        let className = `palettes_color`;

        if (isLight(colorData.color)) {
          className += ` -darkText`;
        }

        const isAlreadyInPalette = this.props.theme.palette.some(
          customPaletteColor =>
            typeof customPaletteColor === `object` &&
            customPaletteColor.color.red === colorData.color.red &&
            customPaletteColor.color.green === colorData.color.green &&
            customPaletteColor.color.blue === colorData.color.blue,
        );

        return (
          <Button
            className={className}
            key={colorData.name}
            backgroundColor={createCssRgb(colorData.color)}
            onClick={handleClick}
            isDisabled={isAlreadyInPalette}
          >
            {colorData.name}
            {isAlreadyInPalette && <Check className="icon" />}
          </Button>
        );
      });
    }

    const themeColors = [];

    if (this.state.activeTab === `palettes`) {
      const allColors = Object.values(this.props.theme.variables);
      const hexes = allColors.map(({ red, green, blue }) =>
        createHex({
          red,
          green,
          blue,
          alpha: 255,
        }),
      );
      const uniqueHexes = new Set(hexes);

      themeColors.push(...uniqueHexes);
    }

    let value;

    if (this.state.activeTab === `image`) {
      value = this.state.wallpaper!;
    } else if (this.state.activeTab === `gradient`) {
      value = this.state.gradient!;
    } else {
      value = this.state.color!;
    }

    return (
      <Dialog
        ref={this.dialog}
        onClose={this.handleClose}
        buttons={[
          {
            caption: localization.variableEditor.save,
            onClick: this.handleSave,
            shouldCloseAfterClick: true,
          },
          {
            caption: localization.variableEditor.cancel,
            shouldCloseAfterClick: true,
          },
          {
            caption: localization.variableEditor.delete,
            onClick: this.props.onDelete,
            shouldCloseAfterClick: true,
            isDangerous: true,
          },
        ]}
      >
        <VariablePreview
          theme={this.props.theme}
          variable={this.props.variable}
          value={value}
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
        {this.state.activeTab === `colorNumeric` && (
          <ColorEditor
            color={this.state.color!}
            onChange={this.handleColorChange}
          />
        )}
        {this.state.activeTab === `image` && (
          <>
            <Buttons className="variableEditor_buttons">
              <Button onClick={this.handleUploadWallpaperClick}>
                {localization.variableEditor.uploadImage}
              </Button>
              {this.state.wallpaper && (
                <Button onClick={this.handleDownloadClick}>
                  {localization.variableEditor.downloadImage}
                </Button>
              )}
            </Buttons>
            {this.state.wallpaperColors && (
              <>
                <Hint>{localization.variableEditor.wallpaperColorsHint}</Hint>
                <div className="palettes">{wallpaperColors}</div>
              </>
            )}
            <input
              hidden={true}
              type="file"
              ref={this.filesInput}
              onChange={this.handleFileInputChange}
              accept=".jpg,.jpeg"
            />
          </>
        )}
        {this.state.activeTab === `gradient` && (
          <>
            <Heading level={4} className="variableEditor_gradientPointHeading">
              {localization.variableEditor.fromPoint}
            </Heading>
            <ColorEditor
              color={this.state.gradient!.from}
              onChange={color => this.handleGradientChange(`from`, color)}
            />
            <Heading level={4} className="variableEditor_gradientPointHeading">
              {localization.variableEditor.toPoint}
            </Heading>
            <ColorEditor
              color={this.state.gradient!.to}
              onChange={color => this.handleGradientChange(`to`, color)}
            />
          </>
        )}
        {this.state.activeTab === `palettes` && (
          <Palettes
            onChange={this.handleColorChange}
            themeColors={themeColors}
            alpha={this.state.color!.alpha}
            themeCustomPalette={this.props.theme.palette}
            onCustomPaletteEditStart={this.hanldeCustomPaletteEditStart}
          />
        )}
      </Dialog>
    );
  }
}
