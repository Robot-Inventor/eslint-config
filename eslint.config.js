"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_eslint_1 = require("typescript-eslint");
var index_ts_1 = require("./src/index.ts");
var overrides = {
    rules: {
        "sort-keys": "off"
    }
};
exports.default = typescript_eslint_1.config.apply(void 0, __spreadArray(__spreadArray([], index_ts_1.eslintConfig, false), [overrides], false));
