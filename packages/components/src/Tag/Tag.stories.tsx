import { Story, Meta } from "@storybook/html";
import UITag from "./Tag";
import type { TagProps, Color } from "./Tag";
import type { Size } from "../types";

export default {
  title: "Example/Tag",
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
        type: "inline-radio",
        options: [
          "magenta",
          "red",
          "volcano",
          "orange",
          "gold",
          "lime",
          "green",
          "blue",
          "geekblue",
          "purple",
          "cyan",
        ] as Color[],
      },
    },
  },
} as Meta;

const Template: Story<TagProps> = (args: TagProps) => <UITag {...args} />;

export const Tag = Template.bind({});
const props: TagProps = {
  children: "Tag",
};
Tag.args = { ...props };
