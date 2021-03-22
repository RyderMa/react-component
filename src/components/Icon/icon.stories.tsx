import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { Icon, IconProps } from "./icon";
library.add(fas);

export default {
  title: "图标组件",
  component: Icon,
  argTypes: {
    theme: "primary",
    icon: "user",
    size: "2x",
  },
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: "danger",
  icon: "baby",
  size: "2x",
};
