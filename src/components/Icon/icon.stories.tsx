import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { Icon, IconProps } from "./icon";
library.add(fas);

export default {
  title: "Icon component",
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: "danger",
  icon: "baby",
};
