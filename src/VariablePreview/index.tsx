import "./styles.scss";

import { createCssRgb } from "@snejugal/color";
import React from "react";
import { defaultValues } from "../atthemeVariables";
import loadPreview from "./loadPreview";
import { Color } from "attheme-js/lib/types";
import { PreviewProps, GetColorParams } from "./previews/common";

interface Props {
  theme: Theme;
  variable: string;
  currentColor?: Color;
  currentWallpaper?: string;
  shouldShowWallpaper?: boolean;
}

interface State {
  Preview: null | ((props: PreviewProps) => JSX.Element);
}

export default class VariablePreview extends React.Component<Props, State> {
  state: State = {
    Preview: null,
  };

  async componentDidMount() {
    const Preview = await loadPreview(this.props.variable);

    if (!Preview) {
      return;
    }

    this.setState({
      Preview,
    });
  }

  getColor = ({
    variable,
    fallback,
  }: GetColorParams) => {
    if (variable === this.props.variable) {
      return this.props.currentColor;
    }

    if (variable in this.props.theme.variables) {
      return this.props.theme.variables[variable];
    }

    if (fallback) {
      const color = (
        this.props.theme.variables[fallback.variable]
        || defaultValues[fallback.variable]
      );

      if (fallback.alpha) {
        color.alpha = fallback.alpha;
      }

      return color;
    }

    return defaultValues[variable];
  };

  render() {
    const { Preview } = this.state;

    return (
      <div className="variablePreview">
        {Preview && (
          <Preview
            getColor={this.getColor}
            wallpaper={this.props.currentWallpaper}
          />
        )}
        {!Preview
          && this.props.shouldShowWallpaper
          && (
            <img
              className="variablePreview_image"
              src={`data:image/jpg;base64,${this.props.currentWallpaper}`}
              alt=""
            />
          )}
        {!Preview
          && !this.props.shouldShowWallpaper
          && (
            <div
              className="variablePreview_color"
              style={{
                backgroundColor: createCssRgb(this.props.currentColor!),
              }}
            />
          )}
      </div>
    );
  }
}
