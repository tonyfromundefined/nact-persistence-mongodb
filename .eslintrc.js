module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "json-format",
    "simple-import-sort",
    "@typescript-eslint/eslint-plugin",
    "prettier",
  ],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true,
        tabWidth: 2,
        useTabs: false,
        trailingComma: "all",
        printWidth: 80,
        arrowParens: "always",
      },
      {
        usePrettierrc: false,
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: false,
      },
    ],
  },
  ignorePatterns: [
    "**/lib/**/*",
    ".yarn/**/*",
    ".pnp.cjs",
    ".pnp.loader.mjs",
    ".eslintrc.js",
  ],
};
