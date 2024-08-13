module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    plugins: ["react", "@typescript-eslint"],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    rules: {},
    ignorePatterns: ["vite.config.ts"],
};
