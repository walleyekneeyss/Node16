module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    /*
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    // 必须配置rules  才能看到效果
    eqeqeq: 2, //全等
    '@typescript-eslint/no-explicit-any': 'off', //any报错
    '@typescript-eslint/no-var-requires': 'off', //不使用import语法
    '@typescript-eslint/no-unused-vars': 2, //未使用的变量强制报错
    'no-alert': 2,
    semi: ['error', 'always'], //行尾分号
  },
};
