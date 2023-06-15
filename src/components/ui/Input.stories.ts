import {type Meta, type StoryObj} from "@storybook/react";
import {Input} from "./Input";

const meta: Meta<typeof Input> = {
    title: "Components/UI/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        children: {
            control: {
                type: "text",
                defaultValue: "Hello, world!",
            },
        },
        placeholder: {
            control: {
                type: "text",
                defaultValue: "Placeholder",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
