import { type Config, defineConfig } from "eslint/config";
import { flatConfigs as importXFlatConfigs, type rules as importXRuleList } from "eslint-plugin-import-x";
import $nextPlugin from "@next/eslint-plugin-next";
import type { ESLintRules } from "eslint/rules";
import type { RuleOptions as JSDocRuleOptions } from "@eslint-types/jsdoc/types";
import type { Linter } from "eslint";
import type { RuleOptions as TSESLintRuleOptions } from "@eslint-types/typescript-eslint/types";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
// eslint-disable-next-line import-x/max-dependencies
import { configs as tseslintConfigs } from "typescript-eslint";

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
    [K in keyof TSESLintRuleOptions]?:
        | Linter.RuleSeverity
        // eslint-disable-next-line no-magic-numbers
        | [Linter.RuleSeverity, TSESLintRuleOptions[K][0]];
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
    [K in keyof typeof importXRuleList as `import-x/${string & K}`]?:
        | Linter.RuleSeverity
        | ((typeof importXRuleList)[K]["defaultOptions"] extends readonly [infer First, ...unknown[]]
              ? [Linter.RuleSeverity, First]
              : [Linter.RuleSeverity, unknown]);
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
    [K in keyof JSDocRuleOptions]?:
        | Linter.RuleSeverity
        // eslint-disable-next-line no-magic-numbers
        | [Linter.RuleSeverity, JSDocRuleOptions[K][0]];
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

const eslintConfigNoJSDoc = defineConfig(
    eslint.configs.all,
    jsdoc.configs["flat/recommended-typescript-error"],
    eslintConfigPrettier,
    ...tseslintConfigs.strictTypeChecked,
    ...tseslintConfigs.stylisticTypeChecked,
    ...(Array.isArray(importXFlatConfigs.recommended)
        ? importXFlatConfigs.recommended
        : [importXFlatConfigs.recommended]),
    ...(Array.isArray(importXFlatConfigs.typescript) ? importXFlatConfigs.typescript : [importXFlatConfigs.typescript]),
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

const JSDocRule = defineConfig({
    rules: {
        ...jsdocRules
    }
});

const eslintConfig = defineConfig(...eslintConfigNoJSDoc, ...JSDocRule);

const eslintReactConfigBase = defineConfig(reactHooks.configs.flat["recommended-latest"], {
    files: ["**/*.tsx"],
    ...react.configs.flat["recommended"],
    plugins: {
        ...react.configs.flat["recommended"]?.plugins,
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

const eslintReactConfig = defineConfig(...eslintConfig, ...eslintReactConfigBase);
const eslintReactConfigNoJSDoc = defineConfig(...eslintConfigNoJSDoc, ...eslintReactConfigBase);

const { configs: nextEslintConfigs, rules: nextEslintRules } = $nextPlugin;

const nextPlugin = {
    rules: nextEslintRules
} as const satisfies NonNullable<Config["plugins"]>[string];

const nextRules = {
    ...nextEslintConfigs.recommended.rules,
    ...nextEslintConfigs["core-web-vitals"].rules
} as const satisfies Config["rules"];

const eslintNextConfigBase = defineConfig({
    // Ref: https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
    plugins: {
        "@next/next": nextPlugin
    },
    rules: nextRules
});

const eslintNextConfig = defineConfig(...eslintReactConfig, ...eslintNextConfigBase);
const eslintNextConfigNoJSDoc = defineConfig(...eslintReactConfigNoJSDoc, ...eslintNextConfigBase);

export {
    eslintConfigNoJSDoc,
    eslintConfig,
    eslintReactConfig,
    eslintReactConfigNoJSDoc,
    eslintNextConfig,
    eslintNextConfigNoJSDoc
};
