import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import Input, { InputProps } from './input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 筛选方法
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /**
   * 选择事件
   */
  onSelect?: (item: DataSourceType) => void;
  /**
   * 渲染子节点的方法
   */
  renderOptions?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;
  const [show, setShow] = useState(true); // 筛选结果显示
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value as string); // 输入内容
  const [activeIndex, setActiveIndex] = useState(0); // 当前选择
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const debounceValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debounceValue) {
      setShow(true);
      setLoading(true);
      const result = fetchSuggestions(debounceValue);
      if (result instanceof Promise) {
        result.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
      setShow(false);
    }
  }, [debounceValue, fetchSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const handleSelect = (item: DataSourceType, index: number) => {
    let currentIndex = 0;
    const result = suggestions.filter((suggestion) =>
      suggestion.value.includes(item.value)
    );
    // setSuggestions([]);
    setInputValue(item.value);

    setActiveIndex(index);
    // if (result instanceof Promise) {
    //   result.then((data) => {
    //     setSuggestions(data);
    //     currentIndex = data.findIndex((resultItem) => resultItem === item);
    //     setActiveIndex(currentIndex);
    //   });
    // } else {
    setSuggestions(result);
    currentIndex = result.findIndex((resultItem) => resultItem === item);
    setActiveIndex(currentIndex);
    // }
    onSelect && typeof onSelect === 'function' && onSelect(item);
  };

  const onFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    inputValue && setShow(true);
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setShow(false);
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item;
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

      <Transition animation="zoom-in-top" in={show} timeout={300}>
        <ul className="suggestions-list">
          {loading ? (
            <li className="loading-item">
              <Icon theme="primary" icon="spinner" spin></Icon>
            </li>
          ) : (
            suggestions.map((item: DataSourceType, index: number) => (
              <li
                key={item.value}
                className={classnames('suggestions-item', {
                  'suggestions-item-selected': index === activeIndex,
                })}
                onClick={() => handleSelect(item, index)}
              >
                {renderTemplate(item)}
              </li>
            ))
          )}
        </ul>
      </Transition>
    </div>
  );
};

export default AutoComplete;
