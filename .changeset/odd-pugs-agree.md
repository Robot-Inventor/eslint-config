---
"@robot-inventor/eslint-config": patch
---

fix: address `zod-validation-error` related issues

Fixed the following error in `eslint-plugin-react-hooks`:

```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './v4' is not defined by "exports" in /path/to/project/node_modules/zod-validation-error/package.json
```

Ref: https://github.com/facebook/react/issues/35045
