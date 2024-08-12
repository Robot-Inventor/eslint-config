import type { ESLintRules } from "eslint/rules";
import { config } from "typescript-eslint";
import { eslintConfig } from "./src/index.js";

const overrides = {
    rules: {
        "sort-keys": "off"
    }
} as const satisfies { rules: Partial<ESLintRules> };

export default config(...eslintConfig, overrides);
