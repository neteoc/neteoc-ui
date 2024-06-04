import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    ignores: [
      ".angular/",
      "dist/",
      "**/node_modules/",
      "functions/.eslintrc.js",
      "functions/lib/**/*", // Ignore built files.
      "functions/generated/**/*", // Ignore generated files.
    ]
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
