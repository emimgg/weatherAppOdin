import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignorePatterns: [
      "webpack.config.js",
      "webpack.*.js",
      "dist/",
      "build/",
      "/node_modules/",
    ],
  },
];
