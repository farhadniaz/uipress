import { JSX } from "solid-js";
import { styled } from "solid-styled-components";
import { primaryColor, blackColor, whiteColor, redColor } from "../colors";
import { Size } from "../types";
import Spinner from "../Spinner/Spinner";

export type BodyType =
  | "dashed"
  | "primary"
  | "primaryDashed"
  | "default"
  | "link"
  | "text";

export type Shape = "default" | "circle" | "round";
export type LoadingType = "inline" | "relative";
export type IconPosition = "postfix" | "prefix";

export interface ButtonProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  block?: boolean; //	Option to fit button width to its parent width	boolean	false
  danger?: boolean; //	Set the danger status of button	boolean	false
  disabled?: boolean; //	Disabled state of button	boolean	false
  ghost?: boolean; //	Make background transparent and invert text and border colors	boolean	false
  href?: boolean; //Redirect url of link button	string	-
  htmlType?: boolean; //	Set the original html type of button, see: MDN	string	button
  icon?: any; //	Set the icon component of button	ReactNode	-
  iconPosition?: IconPosition; //	Set the icon component of button	ReactNode	-
  loading?: boolean; //	Set the loading status of button	boolean | { delay: number }	false
  loadingType?: LoadingType;
  shape?: Shape; //	Can be set button shape	default | circle | round	'default'
  size?: Size; //Set the size of button	"xs" | "sm" | "md" | "lg" | "xlg"
  target?: boolean; //	Same as target attribute of a, works when href is specified	string	-
  bodyType?: BodyType; //Can be set to primary ghost dashed link text default	string	default
}

const StyledButton = styled("button")<ButtonProps>`
  ${(props: ButtonProps) => {
    const { block } = props;
    switch (block) {
      case true:
        return `display: block;`;
      default:
        return `display: inline-block;`;
    }
  }}
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: ${blackColor};
  background: ${whiteColor};
  line-height: normal;
  font-weight: 400;
  ${(props: ButtonProps) => {
    const { bodyType, danger } = props;
    switch (bodyType) {
      case "dashed":
        return `
        border-style: dashed;
        border-color: ${blackColor};
        `;

      case "primaryDashed":
      case "primary":
        if (danger) {
          return `color: ${whiteColor};
    border-color:  ${redColor};
    background: ${redColor};
    `;
        } else {
          return `    color: ${whiteColor};
    border-color: ${primaryColor};
    background: ${primaryColor};    

    `;
        }

      case "link":
        return `color: ${primaryColor};
    border-color: transparent;
    background: transparent;`;
      case "text":
        return `color:${blackColor};
    border-color: transparent;
    background: transparent;`;
      default:
        return `border-style: solid;`;
    }
  }}

  ${(props: ButtonProps) => {
    const { danger, bodyType } = props;

    if (danger && bodyType === "primary") {
      return `
      border-color:${redColor};
      color:${whiteColor};
      `;
    } else if (bodyType === "primaryDashed") {
      return `
      border-color:${whiteColor};
      border-style: dashed;
      color:${whiteColor};
      `;
    } else if (danger && (bodyType === "text" || bodyType === "link")) {
      return `
      border-color:transparent;
      color:${redColor};
      `;
    } else if (danger) {
      return `
      border-color:${bodyType !== "default" ? redColor : "transparent"} ;
      color:${redColor};
      `;
    }

    return "";
  }}

${(props: ButtonProps) => {
    const { shape } = props;
    switch (shape) {
      case "circle":
        return `border-radius: 50%;`;
      case "round":
        return `border-radius: 40px;`;
      default:
        return `border-radius: 2px;`;
    }
  }}
  ${(props: ButtonProps) => {
    const { disabled } = props;
    if (disabled) {
      return `opacity: 0.35;`;
    }
  }}


${(props: ButtonProps) => {
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

svg {
    margin: auto;
    display: block;
  }
  .spinner {
    display: inline-block;
    vertical-align: middle;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
  }
  .inner {
    display: inline-block;
    vertical-align: middle;
    ${(props: ButtonProps) => {
      const { iconPosition, loading } = props;

      let paddingLeft = "";
      if (loading) {
        paddingLeft = "padding-left:4px;";
      }
      switch (iconPosition) {
        case "postfix":
          return `${paddingLeft}padding-right:4px;`;
        case "prefix":
          return "padding-left:4px;";
      }
    }}
  }
`;

const Button = (props: ButtonProps) => {
  const {
    icon,
    children,
    bodyType = "default",
    size = "md",
    loadingType = "inline", // TODO
    loading = false,
    disabled,
    danger,
    iconPosition = "prefix",
    ...restProps
  } = props;
  const color =
    bodyType === "primary" ? whiteColor : danger ? redColor : blackColor;

  return (
    <StyledButton
      bodyType={bodyType}
      size={size}
      iconPosition={iconPosition}
      disabled={loading || disabled}
      loading={loading}
      danger={danger}
      {...restProps}
    >
      {loading && <Spinner size="sm" color={color} />}
      {icon && iconPosition === "prefix" && <span class="icon">{icon}</span>}
      <div class="inner">{children}</div>
      {icon && iconPosition === "postfix" && <span class="icon">{icon}</span>}
    </StyledButton>
  );
};

export default Button;
