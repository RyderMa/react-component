import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
  useRef,
  createRef,
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
  /**
   * 是否开启 Debounce
   */
  debounce?: boolean;
  delay?: number;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    debounce,
    delay,
    renderOptions,
    ...restProps
  } = props;
  const [loading, setLoading] = useState(false);
  const inputElement = createRef<HTMLInputElement>();
  const [activeIndex, setActiveIndex] = useState(0); // 当前选择
  const [inputValue, setInputValue] = useState(value as string); // 输入内容
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [suggestionsShow, setSuggestionsShow] = useState(true); // 筛选结果显示
  const [dependentValue, setDependentValue] = useState(value as string); // bebounce依赖 value
  const debounceValue = useDebounce(dependentValue, delay || 500);

  const onChange = useCallback(
    (value: string) => {
      if (value) {
        setSuggestionsShow(true);
        setLoading(true);
        const result = fetchSuggestions(value);
        if (result instanceof Promise) {
          result.then((data) => {
            setLoading(false);
            setSuggestions(data);
          });
        } else {
          setSuggestions(result);
        }
      } else {
        setSuggestionsShow(false);
        setSuggestions([]);
      }
    },
    [setSuggestionsShow, setLoading, setSuggestions, fetchSuggestions]
  );

  useEffect(() => {
    if (!debounce) return;
    onChange(debounceValue);
  }, [debounce, debounceValue, onChange, fetchSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    debounce ? setDependentValue(value) : onChange(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputValue && suggestions.length > 0) {
      switch (e.keyCode) {
        case 13:
          // enter
          const item = suggestions[activeIndex];
          item && handleSelect(item, activeIndex);
          item && setSuggestionsShow(!suggestionsShow);
          console.log('inputElement', inputElement);

          break;
        case 27:
          // esc
          setInputValue('');
          setSuggestionsShow(false);
          break;
        case 38:
          // up
          activeIndex !== 0 && setActiveIndex(activeIndex - 1);
          break;
        case 40:
          // down
          activeIndex !== suggestions.length - 1 &&
            setActiveIndex(activeIndex + 1);
          break;
      }
    }
  };

  const handleSelect = (item: DataSourceType, index: number) => {
    let currentIndex = 0;
    const result = suggestions.filter((suggestion) =>
      suggestion.value.includes(item.value)
    );
    setInputValue(item.value);
    setActiveIndex(index);
    setSuggestions(result);
    currentIndex = result.findIndex((resultItem) => resultItem === item);
    setActiveIndex(currentIndex);
    onSelect && typeof onSelect === 'function' && onSelect(item);
  };

  const onFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    inputValue && setSuggestionsShow(true);
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setSuggestionsShow(false);
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item;
  };

  return (
    <div className="mantd-autocomplete-wrapper">
      <Input
        ref={inputElement}
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
      ></Input>

      <Transition animation="zoom-in-top" in={suggestionsShow} timeout={300}>
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
