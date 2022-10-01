import { Story, Meta } from "@storybook/html";
import UIButton from "./Button";
import type { ButtonProps, Shape, BodyType, IconPosition } from "./Button";
import type { Size } from "../types";
import { CgHome } from "solid-icons/cg";

export default {
  title: "Example/Button",
  argTypes: {
    shape: {
      control: {
        type: "inline-radio",
        options: ["default", "round", "circle"] as Shape[],
        default: "round",
      },
    },
    bodyType: {
      control: {
        type: "inline-radio",
        options: [
          "default",
          "dashed",
          "link",
          "primary",
          "primaryDashed",
          "text",
        ] as BodyType[],
      },
    },

    size: {
      control: {
        type: "inline-radio",
        options: ["xs", "sm", "md", "lg", "xlg"] as Size[],
        default: "md" as Size,
      },
    },
    iconPosition: {
      control: {
        type: "inline-radio",
        options: ["postfix", "prefix"] as IconPosition[],
        default: "postfix" as IconPosition,
      },
    },
    loading: {
      control: "boolean",
      default: false,
    },
    danger: {
      control: "boolean",
      default: false,
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <UIButton {...args} />
);

export const Button = Template.bind({});
const props: ButtonProps = {
  children: "Click Me",
  iconPosition: "postfix",
  icon: <CgHome size={18} />,
};
Button.args = { ...props };
