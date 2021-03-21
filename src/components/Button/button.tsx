import React, { FC } from 'react';
import classnames from 'classnames';
import Ripple from '../Ripple/ripple';

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否可点击
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: ButtonSize;
  /**
   * 类型
   */
  btnType?: ButtonType;
  /**
   * 是否显示水波纹
   */
  ripple?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * btnType 为 link时, 导航链接
   */
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
// button和 a 属性不通用且不知道会传入什么 Partial 将所有属性设置成可选择的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * ~~~js
 * import {Button} from 'antd'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    ripple,
    children,
    href,
    ...restProps
  } = props;

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    // ripple: ripple,
    disabled: btnType === 'link' && disabled,
  });

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
        <Ripple></Ripple>
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  ripple: true,
};

export default Button;
