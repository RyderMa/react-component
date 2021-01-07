import React, { ChangeEvent, FC } from 'react';
import classnames from 'classnames';

type InputSize = 'lg' | 'sm';

// Omit 忽略接口中的某个属性
export interface InputProps  // "size"
  extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否可以编辑
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: InputSize;
  /**
   * 可清空
   */
  clearable?: boolean;
  /**
   * 内置前缀
   */
  prefixEle?: string | React.ReactElement;
  /**
   * 内置后缀
   */
  suffixEle?: string | React.ReactElement;
  /**
   * 前置标签
   */
  addonBefore?: string | React.ReactElement;
  /**
   * 后置标签
   */
  addonAfter?: string | React.ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {
    className,
    disabled,
    size,
    clearable,
    prefixEle,
    suffixEle,
    addonBefore,
    addonAfter,
    placeholder,
    ...restProps
  } = props;

  if ('value' in props) {
    // 存在value属性时删除 defaultValue
    delete restProps.defaultValue;
  }

  const classes = classnames('mantd-input', className, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-prefix': prefixEle,
    'input-suffix': suffixEle,
  });

  return <input className={classes} disabled={disabled} {...restProps} />;
};

export default Input;
