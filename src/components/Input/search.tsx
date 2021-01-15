import React, { FC, useMemo, useRef } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Button from "../Button/button";
import Input, { InputProps } from "./input";

export interface SearchProps extends InputProps {
  clearAble?: boolean;
  loading?: boolean;
  searchEle?: string | React.ReactNode;
  onSearch?: (
    value?: string,
    event?: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

export const Search: FC<SearchProps> = (props) => {
  const {
    size,
    value,
    disabled,
    className,
    clearAble,
    searchEle,
    onSearch,
    loading,
    placeholder,
    ...restProps
  } = props;

  const inputEle = useRef<typeof Input | HTMLInputElement>(null);

  const searchClasses = useMemo(() => {
    return classnames(
      "mantd-input-group-wrapper mantd-input-search",
      className,
      {
        [`input-group-wrapper-${size}`]: size,
        "is-disabled": disabled,
      }
    );
  }, [className, size, disabled]);

  return (
    <span className={searchClasses}>
      <span className="mantd-input-wrapper mantd-input-group">
        <Input
          // ref={inputEle}
          size={size}
          disabled={disabled}
          placeholder={placeholder}
          {...restProps}
          clearAble={clearAble}
        ></Input>
        <span className="mantd-input-group-addon">
          <Button
            size={size}
            value={value}
            btnType="primary"
            disabled={disabled}
            onClick={(e) => onSearch && onSearch("123", e)}
          >
            {loading ? (
              <Icon className="loading" theme="light" icon="spinner"></Icon>
            ) : searchEle ? (
              searchEle
            ) : (
              "搜索"
            )}
          </Button>
        </span>
      </span>
    </span>
  );
};

export default Search;
