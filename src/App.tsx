import React, { useState } from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Transition from "./components/Transition/transition";
import Input from "./components/Input/input";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const App: React.FC = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="App" style={{ marginLeft: "200px" }}>
      <h3>Button component</h3>
      <Button disabled>123</Button>
      <Button
        onClick={() => {
          alert(123);
        }}
        btnType="primary"
      >
        123
      </Button>
      <Button btnType="danger">Danger</Button>
      <Button size="lg">123</Button>
      <Button btnType="link" href="http://www.baidu.com" disabled>
        Bai Du
      </Button>
      <Button btnType="link" target="_blank" href="http://www.baidu.com">
        Bai Du
      </Button>
      <h3>Menu component</h3>
      <Menu
        defaultIndex={"0"}
        className="test"
        mode="vertical"
        defaultOpenSubMenus={["3"]}
      >
        <MenuItem disabled>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
        <SubMenu title="一级菜单">
          <MenuItem>MenuItem2</MenuItem>
          <MenuItem>MenuItem3</MenuItem>
        </SubMenu>
      </Menu>
      <h3>Transition component</h3>
      <Button onClick={() => setShow(!show)}>toggle article</Button>
      <Transition animation="zoom-in-left" in={show} timeout={300}>
        <div>
          <h4>article title</h4>
          <p>article content</p>
          <p>article content</p>
          <p>article content</p>
          <p>article content</p>
          <p>article content</p>
        </div>
      </Transition>
      <Transition
        wrapper={true}
        animation="zoom-in-left"
        in={show}
        timeout={300}
      >
        <Button btnType="primary" size="lg">
          transition button
        </Button>
      </Transition>
      <h3>输入框</h3>
      <Input></Input>
    </div>
  );
};

export default App;
