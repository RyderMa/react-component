import React, { ChangeEvent, FC, useState, useMemo, useRef } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";

// Omit 忽略接口中的某个属性
export interface InputProps
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
  clearAble?: boolean;
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
  /**
   * 搜索
   */
  searchable?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {
    className,
    disabled,
    size,
    clearAble,
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

  const groupClasses = useMemo(() => {
    return classnames("mantd-input-group-wrapper", className, {
      [`input-group-wrapper-${size}`]: size,
      "is-disabled": disabled,
    });
  }, [className, size, disabled]);

  const focus = () => {
    inputEle.current?.focus();
  };

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
    focus();
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

  // 重置输入内容
  const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    resolveOnChange(inputEle.current!, e, restProps.onChange);
    setTimeout(() => {
      focus();
    });
  };

  const renderClearIcon = () => {
    return (
      <span
        className="mantd-input-suffix clear"
        onClick={(e) => {
          e.stopPropagation();
          e.persist(); // 事件处理程序运行后访问事件对象的属性 获取正确的 event
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
  if (prefixEle || suffixEle || clearAble) {
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
        {clearAble && renderClearIcon()}
      </span>
    );
  }

  // 带有前后元素
  if (addonAfter || addonBefore) {
    return (
      <span className={groupClasses}>
        <span className="mantd-input-wrapper mantd-input-group">
          {addonBefore && (
            <span className="mantd-input-group-addon">{addonBefore}</span>
          )}
          <input
            className={classes}
            disabled={disabled}
            placeholder={placeholder}
            {...restProps}
          />
          {addonAfter && (
            <span className="mantd-input-group-addon">{addonAfter}</span>
          )}
        </span>
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
