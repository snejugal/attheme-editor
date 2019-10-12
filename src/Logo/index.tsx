import "./styles.scss";

import React, { memo } from "react";
import { ReactComponent as LogoSvg } from "./logo.svg";

interface Props {
  onClick(): void;
}

const Logo = ({ onClick }: Props) => {
  return <div className="logo" onClick={onClick}>
    <LogoSvg />
  </div>
};

export default memo(Logo);
