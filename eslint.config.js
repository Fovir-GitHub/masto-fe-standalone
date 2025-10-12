const globals = require("globals");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const pluginPromise = require("eslint-plugin-promise");
const pluginJest = require("eslint-plugin-jest");

module.exports = [

  // Global settings.
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Import set of sensible rules from f0x and
  // override some of them to fit the masto style
  // to avoid reformatting a million files.
  ...require("@f0x52/eslint-config"),
  {
    rules: {
      "@stylistic/indent": ["error", 2],
      "no-unused-vars": "off",
      "no-use-before-define": "off",
      "no-useless-assignment": "off",
      "no-case-declarations": "warn",
      "quotes": ["error", "double"],
    },
  },

  // Files about which
  // we do not care.
  {
    ignores: [
      "build/**/*",
      "coverage/**/*",
      "db/**/*",
      "lib/**/*",
      "log/**/*",
      "node_modules/**/*",
      "nonobox/**/*",
      "public/**/*",
      "!public/embed.js",
      "spec/**/*",
      "tmp/**/*",
      "vendor/**/*",
      "!**/.eslintrc.js",
    ],
  },

  // Main rules for source
  // files defined here.
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx",
    ],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "promise": pluginPromise,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: true,
      },
    },
    rules: {
      // Import recommended rules for plugins.
      ...importPlugin.flatConfigs.warnings.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...pluginPromise.configs["flat/recommended"].rules,
      
      // Override ones we don"t need.
      "react/jsx-uses-react": "off",
      "react/jsx-no-target-blank": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "warn",
      "react/display-name": "warn",
      "react/no-deprecated": "warn",

      // TODO: Fix these jsx-a11y warnings.
      "jsx-a11y/accessible-emoji": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "warn",
      "jsx-a11y/no-onchange": "warn",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "warn",
      "jsx-a11y/no-static-element-interactions": [
        "warn",
        {
          handlers: [
            "onClick",
          ],
        },
      ],

      // Todo: fix these promise warnings.
      "promise/always-return": "warn",
      "promise/catch-or-return": [
        "error",
        {
          allowFinally: true,
        },
      ],
      "promise/no-callback-in-promise": "warn",
      "promise/no-nesting": "warn",
      "promise/no-promise-in-callback": "warn",
    },
  },

  // Rules for test files.
  {
    files: [
      "**/__tests__/*.js",
      "**/__tests__/*.jsx",
    ],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },

  // Rules for other bits and
  // bobs and odds and ends.
  {
    files: [
      "*.config.js",
      ".*rc.js",
      "ide-helper.js",
      "config/webpack/**/*",
      "config/formatjs-formatter.js",
    ],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.commonjs,
      },
    },
    rules: {
      "import/no-commonjs": "off",
    },
  },
];
