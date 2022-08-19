import { Story, Meta } from "@storybook/html";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Example/Button",
  argTypes: {
    count: { control: "number" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const OneButton = Template.bind({});
OneButton.args = { children: "Click Me" };
