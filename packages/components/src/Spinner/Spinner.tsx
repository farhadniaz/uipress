import { styled } from "solid-styled-components";
import { CgSpinner } from "solid-icons/cg";
import { IconProps } from "solid-icons";
import { rotate } from "../animations";
import type { Size } from "../types";

export interface SpinnerProps extends Omit<IconProps, "children"> {
  size?: Size | number;
  speed?: string;
  thickness?: string;
}

const sizeInNumbner: Record<Size, number> = {
  xs: 16,
  sm: 22,
  md: 30,
  lg: 38,
  xlg: 44,
};

const StyledSpan = styled("span")<SpinnerProps>`
  svg {
    animation: ${rotate}
      ${(props) => {
        const { speed = "0.75s" } = props;
        return speed;
      }}
      linear infinite;
  }
`;

const Spinner = (props: SpinnerProps) => {
  const { size = "md", color, thickness, ...restProps } = props;
  let sizeIsNumber: string | undefined = isNaN(Number(size))
    ? undefined
    : (size as string);

  return (
    <StyledSpan class="spinner">
      <CgSpinner
        size={sizeIsNumber || sizeInNumbner[size as Size]}
        color={color}
        stroke={color}
        stroke-width={thickness}
        {...restProps}
      />
    </StyledSpan>
  );
};

export default Spinner;
