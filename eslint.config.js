import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  // 關掉所有會和 Prettier 衝突的 ESLint 規則
  prettierConfig,

  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // 邏輯 / 品質
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-useless-catch": "off",

      // Prettier 結果如果不一致 → 顯示成 ESLint 問題
      "prettier/prettier": "warn",
    },
  },

  // Node 環境（vite.config.js）
  {
    files: ["vite.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  // Node 環境（json-server / mock server）
  {
    files: ["mock/**/*.js", "mock/**/*.cjs", "server.js"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: "commonjs",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
]);
