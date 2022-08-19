import { JSX } from "solid-js";
import { styled } from "solid-styled-components";

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const StyledButton = styled("button")`
  border-radius: 8px;
`;

const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
