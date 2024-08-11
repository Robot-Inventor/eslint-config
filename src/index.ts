import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfigNoJSDoc: ReturnType<typeof tseslint.config> = tseslint.config(
    eslint.configs.all,
    jsdoc.configs["flat/recommended-typescript-error"],
    eslintConfigPrettier,
    ...tseslint.configs.strictTypeChecked,
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
                {
                    allowAsStatement: true
                }
            ],
            "object-curly-spacing": ["error", "always"],
            "one-var": ["error", "never"],
            "padded-blocks": ["error", "never"],
            "quote-props": ["error", "consistent-as-needed"],
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
            "no-new": "off",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/explicit-member-accessibility": "error",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-import-type-side-effects": "error",
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/strict-boolean-expressions": "error",
            "@typescript-eslint/switch-exhaustiveness-check": "error"
        }
    }
);

const JSDocRule = tseslint.config({
    rules: {
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
    }
});

const eslintConfig: ReturnType<typeof tseslint.config> = tseslint.config(...eslintConfigNoJSDoc, ...JSDocRule);

export { eslintConfigNoJSDoc, eslintConfig };
