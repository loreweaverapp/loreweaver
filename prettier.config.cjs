/** @type {import("prettier").Config} */
const config = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: false,
    bracketSameLine: false,
    arrowParens: "always",
    endOfLine: "lf",
    plugins: [
        require.resolve("prettier-plugin-prisma"),
        require.resolve("prettier-plugin-tailwindcss"),
    ],
    pluginSearchDirs: false,
    overrides: [
        {
            files: "**/*.prisma",
            options: {
                parser: "prisma-parse",
            },
        },
    ],
};

module.exports = config;
