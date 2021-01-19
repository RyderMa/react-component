import React, { ChangeEvent, FC, useState } from "react";
import classnames from "classnames";
import Input, { InputProps } from "./input";
import Transition from "../Transition/transition";
import { isTemplateExpression } from "typescript";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Jux",
    "LeeSin",
    "Yi",
    "Yasuo",
    "Fiora",
  ]);
  const [show, setShow] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const result = fetchSuggestions(value);
      console.log("result", result);
      setShow(true);
      setSuggestions(result);
    } else {
      setSuggestions([]);
      setShow(false);
    }
  };

  const onFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    // if (inputValue) {
    //   setShow(true);
    // }
    setShow(false);
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    // setShow(false);
    setShow(true);
  };

  return (
    <div className="mantd-autocomplete-wrapper">
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onBlur={onBlur}
        onFocus={onFocus}
      ></Input>
      {show}
      <Transition animation="zoom-in-top" in={show} timeout={300}>
        <ul className="suggestions-list">
          {suggestions.map((item: string) => (
            <li key={item} className="suggestions-item">
              {item}
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
};

export default AutoComplete;
