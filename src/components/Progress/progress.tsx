import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';

interface ProgressProps {
  /**
   * 当前进度
   */
  percent: number;
  /**
   * 进度条高度
   */
  strokeHeight?: number;
  /**
   * 是否展示文字
   */
  showText?: boolean;
  /**
   * 行内样式
   */
  styles?: React.CSSProperties;
  /**
   * 主题色
   */
  theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;

  return (
    <div className="antd-progress-bar" style={styles}>
      <div
        className="antd-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`antd-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      {showText && <span className="inner-text">{percent}%</span>}
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};

export default Progress;
