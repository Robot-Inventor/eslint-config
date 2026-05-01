import type { ESLintRules } from "eslint/rules";
import { defineConfig } from "eslint/config";
import { eslintConfig } from "./src/index.ts";

const overrides = {
    rules: {
        "sort-keys": "off"
    }
} as const satisfies { rules: Partial<ESLintRules> };

export default defineConfig([...eslintConfig, overrides]);
