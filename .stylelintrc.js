module.exports = {
  /* 继承公共配置 */
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-recess-order', 'stylelint-config-standard'],
  /* 项目个性化的规则 */
  rules: {
    'selector-class-pattern': null, // 设置类名选择器不遵循 kebab-case
    'keyframes-name-pattern': null, // 设置动画名 不遵循kebab-case
    indentation: [
      // 指定缩进  warning 提醒
      2,
      { severity: 'warning' },
    ],
    'selector-pseudo-element-no-unknown': null, // deep报错
    'at-rule-no-unknown': null, // 禁止使用未知的 at 规则
    // 'selector-class-pattern': [ // 命名规范 -
    //     '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    //     {
    //         'message': 'Expected class selector to be kebab-case'
    //     }
    // ],
    // 'string-quotes': 'single', // 单引号
    // 'at-rule-empty-line-before': null,
    // 'at-rule-name-case': 'lower',// 指定@规则名的大小写
    // 'length-zero-no-unit': true,  // 禁止零长度的单位（可自动修复）
    // 'shorthand-property-no-redundant-values': true, // 简写属性
    // 'number-leading-zero': 'never', // 小数不带0
    // 'declaration-block-no-duplicate-properties': true, // 禁止声明快重复属性
    // 'no-descending-specificity': true, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
    // 'selector-max-id': 1, // 限制一个选择器中 ID 选择器的数量
    // 'max-nesting-depth': 3,
    // 'declaration-colon-space-before': 'never',// 在冒号之前禁止有空格
    // 'declaration-colon-space-after': 'always',// 在冒号之后要求有一个空格
    // 'declaration-block-semicolon-space-before':'never', // 在声明块的分号之前禁止有空白
    // 'declaration-block-trailing-semicolon':'always',//要求声明块中使用拖尾分号
    // 'declaration-block-semicolon-newline-after':'always-multi-line',
    // 'no-eol-whitespace':true, // 不允许行尾空白
  },
};
