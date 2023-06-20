import type {Preview} from "@storybook/react";
import "$/styles/globals.css";
import "./styles.css";

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: "Dark",
            values: [
                {
                    name: "Dark",
                    value: "hsl(var(--background))",
                }
            ]
        }
    },
    globalTypes: {
        darkMode: {
            defaultValue: true,
        },
    },
};

export default preview;
