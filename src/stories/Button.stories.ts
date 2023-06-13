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
            defaultValue: "primary",
            type: {
                name: "enum",
                value: [
                    "primary",
                    "secondary",
                    "destructive",
                    "outline",
                    "ghost",
                    "link",
                ],
                required: true,
            },
            control: {
                type: "select",
                required: true,
            },
        },
        size: {
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg"],
                required: true,
            },
            control: {
                type: "radio",
            },
        },
        asChild: {
            defaultValue: false,
            type: {
                name: "boolean",
                required: true,
            },
            control: {
                type: "boolean",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Button",
    },
};

export const Primary: Story = {
    name: "Primary (Default)",
    args: {
        variant: "primary",
        children: "Create Item",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Edit Item",
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "Delete Item",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Copy Item",
    },
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Select Item",
    },
};

export const Link: Story = {
    args: {
        variant: "link",
        children: "View Item",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        children: "Small",
    },
};

export const Medium: Story = {
    name: "Medium (Default)",
    args: {
        size: "md",
        children: "Medium",
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        children: "Large",
    },
};
