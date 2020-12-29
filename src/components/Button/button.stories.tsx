import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

import Button from "./button";

const defaultButton = () => (
  <Button onClick={action("clicked")}>default button</Button>
);

const buttonWithSize = () => (
  <>
    <Button size="lg">大尺寸</Button>
    <Button size="sm">小尺寸</Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary">primary</Button>
    <Button btnType="danger">danger</Button>
    <Button btnType="link" href="http://www.baidu.com">
      link
    </Button>
  </>
);

const disbledButton = () => (
  <>
    <Button disabled>primary</Button>
    <Button btnType="link" disabled>
      link
    </Button>
  </>
);

storiesOf("Button component", module)
  .addDecorator(withInfo)
  .add("默认 Button", defaultButton)
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不同类型的 Button", buttonWithType)
  .add("不可点击(disabled) Button", disbledButton);
