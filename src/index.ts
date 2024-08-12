import eslint from "@eslint/js";
import type { Linter } from "eslint";
import type { ESLintRules } from "eslint/rules";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import eslintConfigPrettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import { FlatCompat } from "@eslint/eslintrc";
import type { RuleOptions as TSESLintRuleOptions } from "@eslint-types/typescript-eslint/types";
import type { RuleOptions as JSDocRuleOptions } from "@eslint-types/jsdoc/types";

const compat = new FlatCompat();

const eslintRules = {
    "array-element-newline": ["error", "consistent"],
    curly: ["error", "multi-line"],
    "function-call-argument-newline": ["error", "consistent"],
    "lines-between-class-members": [
        "error",
        "always",
        {
            exceptAfterSingleLine: true
        }
    ],
    "max-len": [
        "error",
        {
            code: 120
        }
    ],
    "multiline-ternary": ["error", "always-multiline"],
    "no-magic-numbers": [
        "error",
        {
            ignoreArrayIndexes: true
        }
    ],
    "no-ternary": "off",
    "no-void": [
        "error",
        // @ts-expect-error
        {
            allowAsStatement: true
        }
    ],
    "object-curly-spacing": ["error", "always"],
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "space-before-function-paren": [
        "error",
        {
            anonymous: "always",
            asyncArrow: "always",
            named: "never"
        }
    ],
    "no-plusplus": "off",
    "no-extra-parens": [
        "error",
        "all",
        {
            nestedBinaryExpressions: false
        }
    ],
    "no-new": "off"
} as const satisfies Partial<ESLintRules>;

type TSESLintRules = {
    [K in keyof TSESLintRuleOptions]?: Linter.RuleLevel | [Linter.RuleLevel, TSESLintRuleOptions[K][0]];
};

const tseslintRules = {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
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
        | Linter.RuleLevel
        | [Linter.RuleLevel, (typeof importX.rules)[K]["defaultOptions"][0]];
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
    [K in keyof JSDocRuleOptions]?: Linter.RuleLevel | [Linter.RuleLevel, JSDocRuleOptions[K][0]];
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

const eslintConfigNoJSDoc: ReturnType<typeof tseslint.config> = tseslint.config(
    eslint.configs.all,
    jsdoc.configs["flat/recommended-typescript-error"],
    eslintConfigPrettier,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    ...compat.config(importX.configs.recommended),
    importX.configs.typescript,
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
        rules: {
            ...eslintRules,
            ...tseslintRules,
            ...importXRules
        }
    }
);

const JSDocRule = tseslint.config({
    rules: {
        ...jsdocRules
    }
});

const eslintConfig: ReturnType<typeof tseslint.config> = tseslint.config(...eslintConfigNoJSDoc, ...JSDocRule);

export { eslintConfigNoJSDoc, eslintConfig };
