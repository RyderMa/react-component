import React, {
  FC,
  MouseEvent,
  useState,
  useLayoutEffect,
  CSSProperties,
} from 'react';

interface RippleStyle {
  x: string | number;
  y: string | number;
  size: string | number;
}

interface RippleRrops {
  /**
   * ripple过渡时间
   */
  duration?: number;
  /**
   * 背景颜色
   */
  color?: string;
  /**
   * 始终居中显示, 常用于图标, 默认值:false
   */
  center?: boolean;
}

export const Ripple: FC<RippleRrops> = (props) => {
  const { duration, color, center } = props;

  const [rippleArray, setRippleArray] = useState<RippleStyle[]>([]);

  const animationStyle: CSSProperties = {
    backgroundColor: color,
    animationName: `${center ? 'rippleCenter' : 'ripple'}`,
    animationDuration: `${duration}ms`,
  };

  const useDebouncedRippleCleanUp = (
    rippleCount: number,
    duration: number = 850,
    cleanUpFunction: Function
  ) => {
    useLayoutEffect(() => {
      let bounce: any = null;
      if (rippleCount > 0) {
        clearTimeout(bounce);

        bounce = setTimeout(() => {
          cleanUpFunction();
          clearTimeout(bounce);
        }, duration * 4);
      }

      return () => clearTimeout(bounce);
    }, [rippleCount, duration, cleanUpFunction]);
  };

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    // setRippleArray([]);
  });

  const handleMouseDown = (event: MouseEvent) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();

    let size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = center
      ? rippleContainer.width / 2 - size / 2
      : event.pageX - rippleContainer.x - size / 2;
    const y = center
      ? rippleContainer.height / 2 - size / 2
      : event.pageY - rippleContainer.y - size / 2;

    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <div className="ripple-container" onMouseDown={(e) => handleMouseDown(e)}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              className="ripple"
              key={'span' + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                ...animationStyle,
              }}
            />
          );
        })}
    </div>
  );
};

Ripple.defaultProps = {
  duration: 850,
  color: '#000',
  center: false,
};

export default Ripple;
