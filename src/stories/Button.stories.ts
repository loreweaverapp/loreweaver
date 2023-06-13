import {type Meta, type StoryObj} from "@storybook/react";
import {Button} from "../components/ui/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
    title: "Components/UI/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        children: {
            defaultValue: "Button",
        },
        variant: {
            mapping: {
                null: undefined,
            },
        },
        size: {
            mapping: {
                null: undefined,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "button",
    },
};

export const Primary: Story = {
    name: "Primary (Default)",
    args: {
        variant: "primary",
        children: "create item",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "edit item",
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "delete item",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "copy item",
    },
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "select item",
    },
};

export const Link: Story = {
    args: {
        variant: "link",
        children: "view item",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        children: "small",
    },
};

export const Medium: Story = {
    name: "Medium (Default)",
    args: {
        size: "md",
        children: "medium",
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        children: "large",
    },
};
