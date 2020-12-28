import React, { FunctionComponentElement, useContext, useState } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface SubMenuItemProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuItemProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;

  const isOpend =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpend);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 200);
  };

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleHover(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleHover(e, false),
        }
      : {};

  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });
  const renderChildren = () => {
    const subMenuClasses = classnames('antd-submenu', {
      'menu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error(
          'Warning: subMenu has a child which is not MenuItem component'
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
