import React, { FC } from 'react';
// import classnames from "classnames";
import Button from '../Button/button';
import Input, { InputProps } from './input';

export interface SearchProps extends InputProps {
  clearAble?: boolean;
  searchEle?: string | React.ReactNode;
  onSearch?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Search: FC<SearchProps> = (props) => {
  const { clearAble, searchEle, onSearch } = props;
  return (
    <span className="mantd-input-group-wrapper">
      <span className="mantd-input-wrapper mantd-input-group">
        <Input></Input>
        <Button btnType="primary" onClick={() => onSearch && onSearch()}>
          {searchEle ? searchEle : '搜索'}
        </Button>
      </span>
    </span>
  );
};

export default Search;
