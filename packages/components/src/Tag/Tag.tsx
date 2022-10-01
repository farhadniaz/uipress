import { JSX, createSignal, Show } from "solid-js";
import { styled } from "solid-styled-components";
import type { Size } from "../types";
import { IoCloseOutline } from "solid-icons/io";
enum ColorEnum {
  "magenta" = "magenta",
  "red" = "red",
  "volcano" = "volcano",
  "orange" = "orange",
  "gold" = "gold",
  "lime" = "lime",
  "green" = "green",
  "blue" = "blue",
  "geekblue" = "geekblue",
  "purple" = "purple",
  "cyan" = "cyan",
}

interface ColorItem {
  color: string;
  background: string;
  borderColor: string;
}
export type Color = keyof typeof ColorEnum;
const colorValues: Record<Color, ColorItem> = {
  magenta: {
    color: "#c41d7f",
    background: "#fff0f6",
    borderColor: "#ffadd2",
  },
  red: {
    color: "#cf1322",
    background: "#fff1f0",
    borderColor: "#ffa39e",
  },
  volcano: {
    color: "#d4380d",
    background: "#fff2e8",
    borderColor: "#ffbb96",
  },
  orange: {
    color: "#d46b08",
    background: "#fff7e6",
    borderColor: "#ffd591",
  },
  gold: {
    color: "#d48806",
    background: "#fffbe6",
    borderColor: "#ffe58f",
  },
  lime: {
    color: "#7cb305",
    background: "#fcffe6",
    borderColor: "#eaff8f",
  },
  green: {
    color: "#389e0d",
    background: "#f6ffed",
    borderColor: "#b7eb8f",
  },
  cyan: {
    color: "#08979c",
    background: "#e6fffb",
    borderColor: "#87e8de",
  },
  blue: {
    color: "#096dd9",
    background: "#e6f7ff",
    borderColor: "#91d5ff",
  },
  geekblue: {
    color: "#1d39c4",
    background: "#f0f5ff",
    borderColor: "#adc6ff",
  },
  purple: {
    color: "#531dab",
    background: "#f9f0ff",
    borderColor: "#d3adf7",
  },
};
export interface TagProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  color?: string | Color;
  icon?: JSX.Element;
  closable?: boolean;
  onClose?: () => void;
  size?: Size;
}

const sizeInNumbner: Record<Size, number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 22,
  xlg: 28,
};

const getColorItem = (color?: string | Color): ColorItem | undefined => {
  if (color) {
    const colorValue = colorValues[color as Color];
    if (colorValue) {
      return colorValue;
    }
  }
  return undefined;
};
const StyledSpan = styled("span")<TagProps>`
  box-sizing: border-box;

  margin: 0 8px 0 0;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  display: inline-flex;
  height: auto;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;
  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  ${(props) => {
    const colorValue = getColorItem(props.color);

    if (colorValue) {
      const { background, borderColor, color } = colorValue;

      return `
      color:${color};
    background: ${background};
    border-color: ${borderColor};
      `;
    }
    return;
  }}
  ${(props: TagProps) => {
    const { size = "middle" } = props;
    switch (size) {
      case "xs":
        return `height: 24px;
    padding: 0px 7px;
    font-size: 12px;
   `;
      default:
      case "sm":
        return `
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
   `;
      case "md":
        return `    height: 40px;
    padding: 6.4px 15px;
    font-size: 16px;
`;

      case "lg":
        return `    height: 44px;
    padding: 7.4px 16px;
    font-size: 18px;
`;

      case "xlg":
        return `    height: 48px;
    padding: 8.4px 18px;
    font-size: 20px;
`;
    }
  }}

  .close {
    margin-left: 4px;
  }
`;

const Tag = (props: TagProps) => {
  const {
    closable,
    onClose = () => {},
    icon,
    children,
    color,
    size = "md",
    ...restProps
  } = props;
  const [closed, setClose] = createSignal(false);

  const close = () => {
    setClose(true);
    onClose();
  };

  const colorValue = getColorItem(props.color);

  return (
    <Show when={!closed()}>
      <StyledSpan size={size} color={color} {...restProps}>
        {icon && icon} <span class="inner">{children}</span>
        <IoCloseOutline
          size={sizeInNumbner[size]}
          onclick={close}
          color={colorValue?.color || props.color || "#000000"}
          class="close"
        />
      </StyledSpan>
    </Show>
  );
};

export default Tag;
