import path from "path";

import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,jsx,cjs}"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      ecmaVersion: 2022,
      parser: await import("@babel/eslint-parser"),
      sourceType: "module",
      globals: {
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
        module: "readonly",
        __dirname: "readonly",
        require: "readonly",
        setTimeout: "readonly",
        localStorage: "readonly",
        console: "readonly",
        process: "readonly",
      },
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prettier/prettier": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
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
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        alias: {
          map: [["@", path.resolve(process.cwd(), "./src")]],
          extensions: [".js", ".jsx"],
        },
      },
    },
  },
];
