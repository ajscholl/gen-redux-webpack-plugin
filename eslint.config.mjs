import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [{
    ignores: ["**/dist/"],
}, {
    plugins: {
        "@typescript-eslint": tsPlugin,
        prettier: prettierPlugin,
    },
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        ...tsPlugin.configs.recommended.rules,
        ...prettierConfig.rules,
        ...prettierPlugin.configs.recommended.rules,
        "sort-imports": ["error", {
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
            allowSeparatedGroups: false,
        }],
        "linebreak-style": ["error", "unix"],
    },
}];