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
  "rules": {
      "no-unused-vars": "off",
      'no-useless-escape': 'off',

  },
};