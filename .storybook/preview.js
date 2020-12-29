/*
 * @Author: your name
 * @Date: 2020-12-26 23:14:32
 * @LastEditTime: 2020-12-28 22:25:17
 * @LastEditors: Please set LastEditors
 * @Description: add global style
 * @FilePath: \antd\.storybook\preview.js
 */

import React from "react";
// import { addDecorator } from "@storybook/react";
import "../src/styles/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

// const styles: React.CSSProperties = {
//   textAlign: "center",
// };
// export const CenterDecorators = (Story: any) => (
//   <div style={styles}>{Story()}</div>
// );
// addDecorator(CenterDecorators);
