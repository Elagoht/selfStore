module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: "latest"
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "prettier"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": ["error", {
      "ts-ignore": "allow-with-description"
    }],

    // General JavaScript rules
    "yoda": ["error", "never", { exceptRange: true }],
    "sort-imports": ["error", {
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
    }],
    "require-await": "error",
    "prefer-template": "error",
    "prefer-exponentiation-operator": "error",
    "prefer-destructuring": ["error",
      { array: false, object: true },
      { enforceForRenamedProperties: false }
    ],
    "no-var": "error",
    "prefer-const": "error",
    "no-useless-computed-key": "error",
    "no-useless-catch": "error",
    "no-unneeded-ternary": "error",
    "no-script-url": "error",
    "no-shadow-restricted-names": "error",
    "no-return-assign": ["error", "always"],
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "error",
    "no-param-reassign": "error",
    "no-lonely-if": "error",
    "no-lone-blocks": "error",
    "no-empty": "error",
    "no-extra-boolean-cast": "error",
    "no-implicit-coercion": "error",
    "no-console": "error",
    "no-alert": "error",

    // Code style and formatting
    "multiline-comment-style": ["warn", "starred-block"],
    "max-len": ["error", {
      code: 80,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    "max-lines": ["error", {
      max: 500,
      skipBlankLines: true,
      skipComments: true
    }],
    "max-nested-callbacks": ["error", 5],
    "id-denylist": ["error", "req", "res", "err", "e", "cb", "acc", "curr", "cur"],
    "eqeqeq": ["error", "always", { null: "ignore" }],
    "default-case-last": "error",
    "default-case": "error",
    "dot-notation": "warn",
    "default-param-last": "error",
    "capitalized-comments": "warn",
    "camelcase": "warn",

    // Error prevention
    "use-isnan": "error",
    "no-unused-private-class-members": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "no-unsafe-optional-chaining": "error",
    "no-unreachable-loop": "error",
    "no-unreachable": "error",
    "no-unmodified-loop-condition": "error",
    "no-unexpected-multiline": "error",

    // Styling
    "quotes": ["error", "double", { avoidEscape: true }],
    "semi": ["error", "never"],

    "prettier/prettier": ["error", {
      "singleQuote": false,
      "semi": false,
      "trailingComma": "none"
    }]
  }
}
