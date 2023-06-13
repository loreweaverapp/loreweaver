// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
    root: true,
    extends: [
        "eslint:recommended",
        "airbnb-base",
        "plugin:storybook/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
    },
    plugins: ["@typescript-eslint"],
    overrides: [
        // Typescript-specific configuration
        {
            files: ["*.ts", "*.tsx"],
            parserOptions: {
                project: path.join(__dirname, "tsconfig.json"),
            },
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:import/typescript",
                "airbnb-typescript/base",
            ],
            rules: {
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/ban-types": "off",
                "@typescript-eslint/no-empty-function": [
                    "error",
                    {
                        allow: ["constructors"],
                    },
                ],
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-call": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "@typescript-eslint/no-unsafe-return": "off",
                "@typescript-eslint/no-useless-constructor": "off",
                "@typescript-eslint/unbound-method": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-unsafe-argument": "off",
                "@typescript-eslint/consistent-type-imports": [
                    "warn",
                    {
                        prefer: "type-imports",
                        fixStyle: "inline-type-imports",
                    },
                ],
                "@typescript-eslint/no-unused-vars": [
                    "warn",
                    {
                        argsIgnorePattern: "^_",
                    },
                ],
                "@typescript-eslint/no-misused-promises": [
                    2,
                    {
                        checksVoidReturn: {
                            attributes: false,
                        },
                    },
                ],
                "@typescript-eslint/no-non-null-assertion": "off",
            },
            settings: {
                "import/parsers": {
                    "@typescript-eslint/parser": [".ts", ".tsx"],
                },
                "import/resolver": {
                    typescript: {
                        alwaysTryTypes: true,
                        project: "tsconfig.json",
                    },
                },
            },
        },
        // React-specific configuration
        {
            files: ["*.jsx", "*.tsx"],
            extends: ["airbnb", "airbnb/hooks", "next/core-web-vitals"],
            rules: {
                // eslint-plugin-react
                "react/destructuring-assignment": "off",
                "react/jsx-props-no-spreading": "off",
                "react/require-default-props": "off",
                "react/react-in-jsx-scope": "off",
            },
        },
        // React + Typescript-specific configuration
        {
            files: ["*.tsx"],
            extends: ["airbnb-typescript"],
        },
        // Global override to ensure Prettier is the highest priority
        {
            files: ["*"],
            extends: ["plugin:prettier/recommended"],
            rules: {
                // Built-in
                "class-methods-use-this": "off",
                "no-console": "off",
                "no-empty-function": "off",
                "no-nested-ternary": "off",
                "no-param-reassign": "off",
                "no-underscore-dangle": "off",
                "no-void": "off",
                // eslint-plugin-import
                "import/extensions": "off",
                "import/no-cycle": "off",
                "import/no-extraneous-dependencies": [
                    "error",
                    {
                        devDependencies: [
                            "**/*.test.ts",
                            "**/*.spec.ts",
                            "**/*.int-spec.ts",
                            "**/*.e2e-spec.ts",
                            "**/jest.config.*",
                            "**/next.config.js",
                        ],
                    },
                ],
                "import/prefer-default-export": "off",
                "import/order": [
                    "error",
                    {
                        groups: [
                            "builtin",
                            "external",
                            "internal",
                            "parent",
                            "sibling",
                            "index",
                            "object",
                            "type",
                        ],
                    },
                ],
            },
        },
    ],
};

module.exports = config;
