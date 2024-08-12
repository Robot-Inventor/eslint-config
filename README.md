# eslint-config

[@Robot-Inventor](https://github.com/Robot-Inventor/)'s ESLint config preset.

## Installation

Then, install the package:

```bash
npm install --save-dev @robot-inventor/eslint-config
```

## Usage

Add the following to your ``eslint.config.js`` file:

```javascript
// ESModule
import { eslintConfig } from "@robot-inventor/eslint-config";

export default eslintConfig;
```

```javascript
// CommonJS
const { eslintConfig } = require("@robot-inventor/eslint-config");

module.exports = eslintConfig;
```

If you don't need JSDoc rules, you can use the ``eslintConfigNoJSDoc`` instead.

```javascript
// ESModule
import { eslintConfigNoJSDoc } from "@robot-inventor/eslint-config";

export default eslintConfigNoJSDoc;
```

```javascript
// CommonJS
const { eslintConfigNoJSDoc } = require("@robot-inventor/eslint-config");

module.exports = eslintConfigNoJSDoc;
```

You can extend or override the config as needed.

```javascript
// ESModule
import { eslintConfig } from "@robot-inventor/eslint-config";

export default [
    ...eslintConfig,
    {
        rules: {
            // Your rules here
        }
    }
];
```

```javascript
// CommonJS
const { eslintConfig } = require("@robot-inventor/eslint-config");

module.exports = [
    ...eslintConfig,
    {
        rules: {
            // Your rules here
        }
    }
];
```
