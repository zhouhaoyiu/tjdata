module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "plugins": [
        "vue",
    ],
    parser: "vue-eslint-parser",
    "parserOptions": {
        "parser": "babel-eslint",
    },
    "rules": {
        "no-unused-vars": "off",
        'no-useless-escape': 'off',
        "no-undef": "off",
    },
};