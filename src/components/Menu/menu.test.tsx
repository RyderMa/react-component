import React from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const defaultProps: MenuProps = {
  defaultIndex: 0,
  className: 'test',
  onSelect: jest.fn(),
};

const testVertical: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps));
    menuElement = wrapper.getByTestId('antd-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('antd-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should render verticla mode when mode is set to vertical', () => {
    cleanup(); // 清除beforeEach中的渲染结果
    const wrapper = render(generateMenu(testVertical));
    const menuElement = wrapper.getByTestId('antd-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
});
