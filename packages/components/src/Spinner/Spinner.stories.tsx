import { Story, Meta } from "@storybook/html";
import UISpinner from "./Spinner";
import type { SpinnerProps } from "./Spinner";
import type { Size } from "../types";

export default {
  title: "Example/Spinner",
  argTypes: {
    size: {
      control: {
        type: "inline-radio",
        options: ["xs", "sm", "md", "lg", "xlg"] as Size[],
        default: "md" as Size,
      },
    },
    color: {
      control: {
        type: "color",
      },
    },
    speed: {
      control: {
        type: "inline-radio",
        options: ["0.5s", "1s", "0.35s"],
        default: "1s",
      },
    },
  },
} as Meta;

const Template: Story<SpinnerProps> = (args: SpinnerProps) => (
  <UISpinner {...args} />
);

export const Spinner = Template.bind({});
const props: SpinnerProps = {};
Spinner.args = { ...props };
