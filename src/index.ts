import { type ConfigArray, config, configs as tseslintConfigs } from "typescript-eslint";
import type { ESLintRules } from "eslint/rules";
import type { RuleOptions as JSDocRuleOptions } from "@eslint-types/jsdoc/types";
import type { Linter } from "eslint";
import type { RuleOptions as TSESLintRuleOptions } from "@eslint-types/typescript-eslint/types";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import jsdoc from "eslint-plugin-jsdoc";
import react from "eslint-plugin-react";
// @ts-expect-error `eslint-plugin-react-compiler` doesn't have type definitions.
// eslint-disable-next-line import-x/max-dependencies
import reactCompiler from "eslint-plugin-react-compiler";

const eslintRules = {
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
} as const satisfies Partial<ESLintRules>;

type TSESLintRules = {
    // eslint-disable-next-line no-magic-numbers
    [K in keyof TSESLintRuleOptions]?: Linter.RuleSeverity | [Linter.RuleSeverity, TSESLintRuleOptions[K][0]];
};

const tseslintRules = {
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
} as const satisfies Partial<TSESLintRules>;

type ImportXRules = {
    [K in keyof typeof importX.rules as `import-x/${string & K}`]?:
        | Linter.RuleSeverity
        // eslint-disable-next-line no-magic-numbers
        | [Linter.RuleSeverity, (typeof importX.rules)[K]["defaultOptions"][0]];
};

const importXRules = {
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
} as const satisfies ImportXRules;

type JSDocRules = {
    // eslint-disable-next-line no-magic-numbers
    [K in keyof JSDocRuleOptions]?: Linter.RuleSeverity | [Linter.RuleSeverity, JSDocRuleOptions[K][0]];
};

const jsdocRules = {
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
} as const satisfies Partial<JSDocRules>;

const eslintConfigNoJSDoc: ConfigArray = config(
    eslint.configs.all,
    jsdoc.configs["flat/recommended-typescript-error"],
    eslintConfigPrettier,
    ...tseslintConfigs.strictTypeChecked,
    ...tseslintConfigs.stylisticTypeChecked,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    {
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        },
        plugins: {
            jsdoc
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
        rules: {
            ...eslintRules,
            ...tseslintRules,
            ...importXRules
        }
    }
);

const JSDocRule: ConfigArray = config({
    rules: {
        ...jsdocRules
    }
});

const eslintConfig: ConfigArray = config(...eslintConfigNoJSDoc, ...JSDocRule);

const eslintReactConfigBase: ConfigArray = config({
    files: ["**/*.tsx"],
    ...react.configs.flat["recommended"],
    plugins: {
        ...react.configs.flat["recommended"]?.plugins,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        "react-compiler": reactCompiler
    },
    rules: {
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
    }
});

const eslintReactConfig: ConfigArray = config(...eslintConfig, ...eslintReactConfigBase);

const eslintReactConfigNoJSDoc: ConfigArray = config(...eslintConfigNoJSDoc, ...eslintReactConfigBase);

export { eslintConfigNoJSDoc, eslintConfig, eslintReactConfig, eslintReactConfigNoJSDoc };
