import globals from "globals";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser }
  },
  {
    plugins: {
      react: pluginReact // Definir react como un objeto plugin
    }
  },
  pluginReact.configs.recommended, // Usar las reglas recomendadas de react
  {
    settings: {
      react: {
        version: "detect" // Detectar la versión de React automáticamente
      }
    }
  }
];
