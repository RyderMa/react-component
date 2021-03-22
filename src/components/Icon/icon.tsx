import React, { FC } from "react";
import classnames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  /**
   * 主题色
   */
  theme?: ThemeProps;
}

export const Icon: FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;

  const classes = classnames("antd-icon", className, {
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>;
};

export default Icon;
