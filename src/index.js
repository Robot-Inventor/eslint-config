"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintNextConfigNoJSDoc = exports.eslintNextConfig = exports.eslintReactConfigNoJSDoc = exports.eslintReactConfig = exports.eslintConfig = exports.eslintConfigNoJSDoc = void 0;
var config_1 = require("eslint/config");
var eslint_plugin_import_x_1 = require("eslint-plugin-import-x");
var eslint_plugin_next_1 = require("@next/eslint-plugin-next");
var js_1 = require("@eslint/js");
var eslint_config_prettier_1 = require("eslint-config-prettier");
var eslint_plugin_jsdoc_1 = require("eslint-plugin-jsdoc");
var eslint_plugin_react_1 = require("eslint-plugin-react");
var eslint_plugin_react_compiler_1 = require("eslint-plugin-react-compiler");
var eslint_plugin_react_hooks_1 = require("eslint-plugin-react-hooks");
// eslint-disable-next-line import-x/max-dependencies
var typescript_eslint_1 = require("typescript-eslint");
var eslintRules = {
    curly: ["error", "multi-line"],
    "no-magic-numbers": [
        "error",
        {
            ignoreArrayIndexes: true
        }
    ],
    "no-ternary": "off",
    "no-void": [
        "error",
        {
            allowAsStatement: true
        }
    ],
    "one-var": ["error", "never"],
    "no-plusplus": "off",
    "no-new": "off"
};
var tseslintRules = {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/array-type": [
        "error",
        {
            default: "array-simple"
        }
    ]
};
var importXRules = {
    "import-x/no-deprecated": "error",
    "import-x/no-extraneous-dependencies": "error",
    "import-x/no-absolute-path": "error",
    "import-x/no-cycle": "error",
    "import-x/no-self-import": "error",
    "import-x/no-useless-path-segments": "error",
    "import-x/exports-last": "error",
    "import-x/first": "error",
    "import-x/group-exports": "error",
    "import-x/max-dependencies": "error",
    "import-x/newline-after-import": "error",
    "import-x/no-unassigned-import": "error"
};
var jsdocRules = {
    "jsdoc/require-jsdoc": [
        "error",
        {
            require: {
                ArrowFunctionExpression: true,
                ClassDeclaration: true,
                ClassExpression: true,
                FunctionDeclaration: true,
                FunctionExpression: true,
                MethodDefinition: true
            }
        }
    ]
};
var eslintConfigNoJSDoc = config_1.defineConfig.apply(void 0, __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([js_1.default.configs.all,
    eslint_plugin_jsdoc_1.default.configs["flat/recommended-typescript-error"],
    eslint_config_prettier_1.default], typescript_eslint_1.configs.strictTypeChecked, false), typescript_eslint_1.configs.stylisticTypeChecked, false), (Array.isArray(eslint_plugin_import_x_1.flatConfigs.recommended)
    ? eslint_plugin_import_x_1.flatConfigs.recommended
    : [eslint_plugin_import_x_1.flatConfigs.recommended]), false), (Array.isArray(eslint_plugin_import_x_1.flatConfigs.typescript) ? eslint_plugin_import_x_1.flatConfigs.typescript : [eslint_plugin_import_x_1.flatConfigs.typescript]), false), [{
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        },
        plugins: {
            jsdoc: eslint_plugin_jsdoc_1.default
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error"
        },
        settings: {
            "import-x/resolver": {
                typescript: true,
                node: true
            }
        },
        rules: __assign(__assign(__assign({}, eslintRules), tseslintRules), importXRules)
    }], false));
exports.eslintConfigNoJSDoc = eslintConfigNoJSDoc;
var JSDocRule = (0, config_1.defineConfig)({
    rules: __assign({}, jsdocRules)
});
var eslintConfig = config_1.defineConfig.apply(void 0, __spreadArray(__spreadArray([], eslintConfigNoJSDoc, false), JSDocRule, false));
exports.eslintConfig = eslintConfig;
var eslintReactConfigBase = (0, config_1.defineConfig)(eslint_plugin_react_hooks_1.default.configs.flat["recommended-latest"], __assign(__assign({ files: ["**/*.tsx"] }, eslint_plugin_react_1.default.configs.flat["recommended"]), { plugins: __assign(__assign({}, (_a = eslint_plugin_react_1.default.configs.flat["recommended"]) === null || _a === void 0 ? void 0 : _a.plugins), { "react-compiler": eslint_plugin_react_compiler_1.default }), rules: {
        "jsdoc/check-tag-names": [
            "error",
            {
                definedTags: ["jsxImportSource"]
            }
        ],
        "react/self-closing-comp": [
            "error",
            {
                component: true,
                html: true
            }
        ],
        "react/jsx-boolean-value": ["error", "never"],
        "react/jsx-curly-brace-presence": ["error", "never"],
        "react-compiler/react-compiler": "error"
    } }));
var eslintReactConfig = config_1.defineConfig.apply(void 0, __spreadArray(__spreadArray([], eslintConfig, false), eslintReactConfigBase, false));
exports.eslintReactConfig = eslintReactConfig;
var eslintReactConfigNoJSDoc = config_1.defineConfig.apply(void 0, __spreadArray(__spreadArray([], eslintConfigNoJSDoc, false), eslintReactConfigBase, false));
exports.eslintReactConfigNoJSDoc = eslintReactConfigNoJSDoc;
var nextEslintConfigs = eslint_plugin_next_1.default.configs, nextEslintRules = eslint_plugin_next_1.default.rules;
var nextPlugin = {
    rules: nextEslintRules
};
var nextRules = __assign(__assign({}, nextEslintConfigs.recommended.rules), nextEslintConfigs["core-web-vitals"].rules);
var eslintNextConfigBase = (0, config_1.defineConfig)({
    // Ref: https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
    plugins: {
        "@next/next": nextPlugin
    },
    rules: nextRules
});
var eslintNextConfig = config_1.defineConfig.apply(void 0, __spreadArray(__spreadArray([], eslintReactConfig, false), eslintNextConfigBase, false));
exports.eslintNextConfig = eslintNextConfig;
var eslintNextConfigNoJSDoc = config_1.defineConfig.apply(void 0, __spreadArray(__spreadArray([], eslintReactConfigNoJSDoc, false), eslintNextConfigBase, false));
exports.eslintNextConfigNoJSDoc = eslintNextConfigNoJSDoc;
