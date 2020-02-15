// https://eslint.org/docs/rules
// https://eslint.vuejs.org/rules
module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        'indent': 'off',
        'space-before-function-paren': [2, 'never'],
        'comma-dangle': ['error', 'always-multiline'],
        'semi-style': ['error', 'last'],
        'semi': ['error', 'always'],

        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
            'argsIgnorePattern': '^_'
        }],
        'vue/html-indent': ['error', 4, { 'baseIndent': 1 }],
        'vue/script-indent': ['error', 4, { 'baseIndent': 1 }],
        'vue/eqeqeq': 'error',
        'vue/array-bracket-spacing': 'error',
        'vue/arrow-spacing': 'error',
        'vue/block-spacing': 'error',
        'vue/brace-style': 'error',
        'vue/camelcase': 'error',
        'vue/comma-dangle': 'error',
        'vue/component-name-in-template-casing': 'error',
        'vue/key-spacing': 'error',
        'vue/match-component-file-name': 'error',
        'vue/object-curly-spacing': 'error'
    }
};
