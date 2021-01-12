import React, { ChangeEvent, FC, useState, useMemo, useRef } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";

// Omit 忽略接口中的某个属性
export interface InputProps  // "size"
  extends Omit<React.InputHTMLAttributes<HTMLElement>, "size"> {
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
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: any) => void;
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

  const [isFocus, setIsFocus] = useState(false);
  const inputEle = useRef<HTMLInputElement>(null);

  if ("value" in props) {
    // 存在value属性时删除 defaultValue
    delete restProps.defaultValue;
  }

  const classes = classnames("mantd-input", className, {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
  });

  const affixClasses = useMemo(() => {
    return classnames("mantd-input-affix-wrapper", className, {
      [`affix-wrapper-${size}`]: size,
      "affix-wrapper-focused": isFocus,
      "is-disabled": disabled,
    });
  }, [className, size, isFocus, disabled]);

  // 聚焦
  const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocus(true);
    if (restProps.onFocus) {
      restProps.onFocus(e);
    }
  };

  // 失去焦点
  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocus(false);
    if (restProps.onBlur) {
      restProps.onBlur(e);
    }
  };

  const onInputWrapperClick = () => {
    inputEle.current?.focus();
  };

  const resolveOnChange = (
    target: HTMLInputElement,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement, MouseEvent>,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (onChange) {
      let event = e;
      if (e.type === "click") {
        // click clear icon
        event = Object.create(e);
        event.target = target;
        event.currentTarget = target;
        const originalInputValue = target.value;
        // change target ref value cause e.target.value should be '' when clear input
        target.value = "";
        onChange(event as React.ChangeEvent<HTMLInputElement>);
        // reset target ref value
        target.value = originalInputValue;
        return;
      }
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    restProps.onChange && restProps.onChange("");
  };

  const renderClearIcon = () => {
    if (!clearable) return;
    return (
      <span
        className="mantd-input-suffix clear"
        onClick={(e) => {
          e.stopPropagation();
          handleReset(e);
        }}
      >
        <Icon
          theme="dark"
          style={{ visibility: restProps.value ? "unset" : "hidden" }}
          icon="times-circle"
        ></Icon>
      </span>
    );
  };

  // 带有内置前后元素的 Input
  if (prefixEle || suffixEle || clearable) {
    return (
      <span className={affixClasses} onClick={() => onInputWrapperClick()}>
        {prefixEle && <span className="mantd-input-prefix">{prefixEle}</span>}
        <input
          ref={inputEle}
          className={classes}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={(e) => onFocus(e)}
          onBlur={(e) => onBlur(e)}
          {...restProps}
        />
        {suffixEle && <span className="mantd-input-suffix">{suffixEle}</span>}
        {/* 清空 */}
        {renderClearIcon()}
      </span>
    );
  }

  // 基础 Input
  return (
    <input
      className={classes}
      disabled={disabled}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

export default Input;
