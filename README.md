# react+webpack+eslint+stylelint+commitlint+husky+git-stage

请保证node版本18以上

## 一、cra 创建项目
```sh
$ npx create-react-app myapp --template typescript
```

## 二、editorconfig统一编辑器配置

由于每个人的**vsocde**编辑器默认配置可能不一样，比如有的默认缩进是**4**个空格，有的是**2**个空格，如果自己编辑器和项目代码缩进不一样，会给开发和项目代码规范带来一定影响，所以需要在项目中为编辑器配置下格式。

https://guojiongwei.top/article/628da9d838ee2f11cc64a022

## 三、eslint

ESLint是一个JavaScript检测开源项目，用于发现代码中的问题和语法问题，它将帮助我们发现只有在运行时才能发现的错误逻辑。

```sh
$ npm install eslint --save-dev
```

安装ESLint后，我们必须初始化配置文件:

```sh
$ npx eslint --init
```

在这里，我们将回答一些关于我们项目的问题:

```apl
? How would you like to use ESLint? … 
  To check syntax only
▸ To check syntax and find problems
  To check syntax, find problems, and enforce code style
```

选择“To check syntax and find problems”，因为稍后我们还将使用Prettier来强制执行代码风格。

```apl
? What type of modules does your project use? … 
▸ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

选择JavaScript模块主要是因为ReactJS使用它们。

```apl
? Which framework does your project use? … 
▸ React
  Vue.js
  None of these
```

选择“React”作为我们的框架。

```apl
? Does your project use TypeScript? ‣ No / Yes   
```

为TypeScript选择“Yes”。

```apl
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node
```

选择“浏览器” 和 Node。

```apl
? What format do you want your config file to be in? … 
▸ JavaScript
  YAML
  JSON
```

在这里，您可以自由选择任何选项，但我将使用JS作为我的格式。

```apl
The config that you've selected requires the following dependencies:
eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
? Would you like to install them now with npm? ‣ No / Yes
```

如果你使用的是NPM，那么选择“Yes”。

现在ESLint包创建了一个`.eslintrc.js`文件, 在继续之前，我们必须先安装与ESLint相关的TypeScript插件:

```sh
$ npm i -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript
```

如果一切顺利，你的`eslintrc.js`文件应该是这样的: 

> 必须配置rules  在文件中才能看到效果！

```js
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
```

### 3.1 支持的配置文件格式

ESLint 支持几种格式的配置文件：

* JavaScript – 使用 .eslintrc.js 然后输出一个配置对象。

* YAML – 使用 .eslintrc.yaml 或 .eslintrc.yml 去定义配置的结构。

* JSON – 使用 .eslintrc.json 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。

* (弃用) – 使用 .eslintrc，可以使 JSON 也可以是 YAML。

* package.json – 在 package.json 里创建一个 eslintConfig属性，在那里定义你的配置。

如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

> .eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json

遇到项目内有多个层叠配置时，依然采用就近原则作为高优先级；

### 3.2 配置文件说明

Rules-启用的规则及其各自的错误级别
ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：

* "off" 或 0 - 关闭规则
* "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
* "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

例如：

```js
rules: {
    'eqeqeq': 2,
    'no-alert': 2,
    'no-undef': 2,
    'no-use-before-define': 2,
    'react-hooks/exhaustive-deps': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,
},
```

更多配置

https://juejin.cn/post/6844904083682279432



## 四、Prettier格式化

### 4.1 什么是Prettier

Prettier是一个诞生于2016年就迅速流行起来的专注于代码格式化的工具。出道即巅峰啊-.-
Prettier只关注格式化，并不具有lint检查语法等能力。它通过解析代码并匹配自己的一套规则，来强制执行一致的代码展示格式。
它在美化代码方面有很大的优势，配合ESLint可以对ESLint格式化基础上做一个很好的补充。

#### 4.2 安装Prettier

```sh
$ npm install prettier --save-dev
```

#### 4.3 配置Prettier规则

在项目根目录新建`.prettierrc.js`,并完善配置
大致配置如下：

```js
module.exports = {
    // 1.一行代码的最大字符数，默认是80(printWidth: <int>)
    printWidth: 120,
    // 2.tab宽度为2空格(tabWidth: <int>)
    tabWidth: 2,
    // 3.是否使用tab来缩进，我们使用空格(useTabs: <bool>)
    useTabs: false,
    // 4.结尾是否添加分号，false的情况下只会在一些导致ASI错误的其工况下在开头加分号，我选择无分号结尾的风格(semi: <bool>)
    semi: true,
    // 5.使用单引号(singleQuote: <bool>)
    singleQuote: true,
    // 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
    quoteProps: 'as-needed',
    // 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
    jsxSingleQuote: false,
    // 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
    trailingComma: 'es5',
    // 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
    bracketSpacing: true,
    // 10.jsx标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
    jsxBracketSameLine: false,
    // 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
    arrowParens: 'avoid',
    // 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
    rangeStart: 0,
    rangeEnd: Infinity,
    // 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
    vueIndentScriptAndStyle: false,
    // 19.    endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
    endOfLine: 'auto',
    // 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
    embeddedLanguageFormatting: 'off',
};
```

https://blog.csdn.net/guxin_duyin/article/details/127048203

## 五、vscode 保存自动格式化

https://guojiongwei.top/article/628da9d838ee2f11cc64a022

### .vscode/settings.json

配置前两步后，虽然已经配置**prettier**格式化规则，但还需要让**vscode**来支持保存后触发格式化

在项目根目录新建 **.vscode**文件夹，内部新建**settings.json**文件配置文件，内容如下：

```json
{
  "search.exclude": {
    "/node_modules": true,
    "dist": true,
    "pnpm-lock.sh": true
  },
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "liveServer.settings.port": 5502
}
```

先配置了忽略哪些文件不进行格式化，又添加了保存代码后触发格式化代码配置，以及各类型文件格式化使用的格式。

这一步配置完成后，修改项目代码，把格式打乱，点击保存时就会看到编辑器自动把代码格式规范化了。

## 六、团队vscode插件保持一致

一键安装团队推荐的 vscode 插件 --- 保证团队成员开发环境一致性，提升工作效率。

### `.vscode/extensions.json`

在前端代码库的根目录下新增 `.vscode/extensions.json`文件注册插件列表，然后将文件随代码提交到 git 。如果哪位成员发现了好用的插件，直接加在 `recommendations` 数组中既可。入 git 的好处就是： 有记录、持续更新、都能看到。

```json
// .vscode/extensions.json
{
  "recommendations": [
    "vue.volar",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint",
    "mrmlnc.vscode-less",
    "voorjaar.windicss-intellisense"
  ]
}
```

### 使用

组员下载代码库后： 1. 进入 vscode 的插件视图； 2. 输入框位置输入 `@recommended` ； 3. 点击下载按钮一键安装

当然 vscode 也会在左下角弹窗进行提示 是否安装 推荐插件

### 列出本机推荐 vscode 插件

在终端执行以下命令，显示当前 vscode 安装过的插件，可以复制名字配置进`.vscode/extensions.json` 进行分享。

```shell
code --list-extensions
```

以上只是在 vscode 中保存自动格式化, 在下面介绍的 git 提交时还会做一步自动格式化,到时候无关编译器！

## 七、Stylelint

一个强大的，现代的代码检查工具，可以帮助您避免错误并在您的样式中强制执行约定。

中文文档：http://stylelint.docschina.org/

### 7.1 安装包

```shell
npm i stylelint stylelint-scss stylelint-config-recess-order stylelint-config-standard stylelint-config-recommended-scss -D
```

依赖说明：

- stylelint                       - Stylelint 本体
- stylelint-config-rational-order - 对 CSS 声明进行排序
- stylelint-config-standard       - Stylelint 官方推荐规则
- stylelint-order                 - 使用 stylelint-config-rational-order 时依赖的模块

### 7.2 创建配置文件

`.stylelintrc.js`

```js
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
```

### 7.3 规则配置参考

官网配置：http://stylelint.cn/user-guide/rules/

- 短横线命名(kebab-case): `^([a-z][a-z0-9]_)(-[a-z0-9]+)_$` `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$`
- 小驼峰命名(lowerCamelCase): `^[a-z][a-za-z0-9]+$`
- 蛇形命名(snake*case): `^([a-z][a-z0-9]\*)(*[a-z0-9]+)\*$`
- 大驼峰命名(UpperCamelCase): `^[A-Z][a-za-z0-9]+$`

### 7.4 package.json 配置 script 脚本

```
"lint:stylelint": "stylelint src/**/*.{vue,css,scss} --fix",
```

### 7.5 忽略文件.stylelintignore

```
# 旧的不需打包的样式库
*.min.css

# 其他类型文件
*.js
*.ts
*.tsx
*.json
*.jpg
*.png
*.eot
*.ttf
*.woff

# 测试和打包目录
/test/
/dist/
```

配置完成后打开**src/App.css**，可以看到很多红色报错

**第一个报错：**

**vite**脚手架创建的**react**项目，类名**App**用的大驼峰，默认的**stylelint**命名规则是小驼峰，这里就会有红色波浪线报错。

![1689301588890-2023-7-14_10:26:28.png](https://gitee.com/cheerqjy/utools-picture/raw/master/1689301588890-2023-7-14_10:26:28.png)

这种必须手动改，没有办法自动修复，或者修改**styleint**默认规则，这里改为不限制类名命名，具体配置可看[selector-class-pattern](https://stylelint.io/user-guide/rules/list/selector-class-pattern/)。

```js
// .stylelintrc.js
module.exports = {
  // ...
  rules: {
    'selector-class-pattern': null, // 设置类名选择器不遵循 kebab-case
  }
}
```

**第二个报错：**

这个报错就是**css**属性顺序的报错，一般**display**应该放在设置高度之前更合理，这类问题可以通过保存后自动修复。

**第三个报错：**

和第一个报错类似，是 **@keyframes App-logo-spin**,动画命名不允许大驼峰，这个也可以手动修改为小驼峰命名。

```js
// .stylelintrc.js
module.exports = {
  // ...
  rules: {
    'keyframes-name-pattern': null, // 设置动画名 不遵循kebab-case
  }
}
```



### 7.6 支持scss和less 上面已默认安装scss, 这一步可选

**支持scss**

要支持**scss**需要先安装**scss**的**stylelint**配置插件[stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss),内部定义了**scss**的语法规则，让**stylelint**可以识别**scss**的语法:

```bash
npm i stylelint-config-standard-scss -D
```

把插件添加到 **.stylelintrc.js**的**extends**中

```js
// .stylelintrc.js
module.exports = {
  // ...
  extends: {
    // ...
    'stylelint-config-standard-scss' // 配置stylelint scss插件
  }
}
```

**scss**文件经过测试上面配置的**stylelint**已经支持**scss**文件，并且可以进行语法检测和保存自动格式化。

**支持less**

要支持**less**，要安装**stylelint-less**插件来支持

```bash
npm i stylelint-less -D
```

修改 **.stylelintrc.js**, 新增以下配置

```js
module.exports = {
  // ...
  plugins: ['stylelint-less'],
  rules: {
    // ...
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    'color-no-invalid-hex': true,
    'less/color-no-invalid-hex': true
  }
}
```

### 7.7 设置保存自动修复

一般希望在保存文件**css**文件后自动修复**css**中的不合理的地方，在安装**vscode**插件**stylelint**后，需要修改一下 **.vscode/settins.json**文件

因为要使用**stylelint**的规则格式化代码，不使用**perttier**来格式化**css**,**less**,**scss**文件了，删除掉 **.vscode/settins.json**中配置的使用**perttier**格式化**css**,**less**,**scss**的配置。

```json
// 删除该代码  也可以不删 不影响
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

在 **.vscode/settins.json**新增**styleint**保存文件格式化样式文件配置：

```json
"stylelint.enable": true,
// 关闭编辑器内置样式检查（避免与stylelint冲突）
"css.validate": false,
"less.validate": false,
"scss.validate": false,
"stylelint.validate": [
    "css",
    "less",
    "postcss",
    "scss",
    "vue",
    "sass"
],
"editor.codeActionsOnSave": {
    // "source.fixAll": true, // 加这句会造成多次格式化，造成style误删
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true, // 开启stylelint自动修复
},
```

#### vscode 插件

在 vs-code 插件市场中搜索 Stylelint 插件

![1689301448546-2023-7-14_10:24:09.png](https://gitee.com/cheerqjy/utools-picture/raw/master/1689301448546-2023-7-14_10:24:09.png)

#### vscode 团队插件推荐

```json
// .vscode/extensions.json
{
  "recommendations": [
    "vue.volar",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint",
    "mrmlnc.vscode-less",
    "voorjaar.windicss-intellisense",
  ]
}
```

### 7.8 踩坑

对 css 的 rgba，插件就会把 rgba 格式化成 rbg 颜色。像这样:

```css
border: 1px solid rgba(255, 255, 255, 0.5);
格式化后
border: 1px solid rgb(255 255 255 / 50%);

这是一个比较新的css规范。sass规范还不支持
```

## 八、git钩子husky

> 注意：需要你的项目目录已经有仓库了

### 什么是husky

`husky` 是一个为 `git `**客户端**增加 `hook` 的工具。安装后，它会自动在仓库中的 `.git/` 目录下增加相应的钩子；比如 `pre-commit` 钩子就会在你执行` git commit` 的触发。

### husky的作用

我们可以在 pre-commit 中实现一些比如 lint 检查、单元测试、代码美化等操作。当然，pre-commit 阶段执行的命令当然要保证其速度不要太慢，每次 commit 都等很久也不是什么好的体验。

也可以在commit-msg钩子中结合commitlint实现提交信息的检查

### 了解githooks

Git Hooks 就是在 Git 执行特定事件（如commit、push、receive等）时触发运行的脚本，类似于“钩子函数”，没有设置可执行的钩子将被忽略。
git hook 的作用是在 git 动作发生前后触发自定义脚本。这些动作包括提交，合并，推送等，我们可以利用这些钩子在 git流程的各个环节实现自己的业务逻辑。

git hook 分为客户端 hook 和服务端 hook。

客户端 hook 主要有四个：

- `pre-commit`：提交信息前运行，可检查暂存区的代码
- `prepare-commit-msg`：不常用
- `commit-msg`：非常重要，检查提交信息就用这个钩子
- `post-commit`：提交完成后运行

服务端 hook 包括：

- `pre-receive`：非常重要，推送前的各种检查都在这
- `post-receive`：不常用
- `update`：不常用

### 自动配置husky

> 注意：需要你的项目目录已经有仓库了

1. 执行命令

```apl
npx husky-init && npm install
```

2. 执行出来会 生成.husky 文件夹

```apl
|-- .husky
    |-- _
    |   |-- .gitignore
    |   |-- husky.sh
    |-- pre-commit
```

pre-commit注释掉 `npm test`

### 在.husky 中创建 commit-msg 文件，填入以下内容

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

目录结构如下

```apl
|-- .husky
    |-- _
    |   |-- .gitignore
    |   |-- husky.sh
    |-- commit-msg
    |-- pre-commit
```

此时还不能自动检查，需要依赖下面第十章的 提交时 自动检查代码

## 九、commitlint：用于检查提交信息

在提交代码时，良好的提交备注会方便多人开发时其他人理解本次提交修改的大致内容，也方便后面维护迭代，但每个人习惯都不一样，需要用工具来做下限制，在**git**提供的一系列的[githooks](https://git-scm.com/womdocs/githooks) 中，**commit-msg**会在**git commit**之前执行，并获取到**git commit**的备注，可以通过这个钩子来验证备注是否合理，而验证是否合理肯定需要先定义一套规范，而[commitlint](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fcommitlint)就是用来做这件事情的，它会预先定义一套规范，然后验证**git commit**的备注是否符合定义的规范。

### 1.安装依赖：

```shell
npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
```

### 2.配置 `commitlint` 文件

根目录中创建`.commitlintrc.js`

```json
module.exports = {
    // 继承的规则
    extends: ['@commitlint/config-conventional'],
    // 定义规则类型
    rules: {
        // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能 feature
                'fix', // 修复 bug
                'docs', // 文档注释
                'style', // 代码格式(不影响代码运行的变动)
                'refactor', // 重构(既不增加新功能，也不是修复bug)
                'perf', // 性能优化
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // 回退
                'build' // 打包
            ]
        ],
        // subject 大小写不做校验
        'subject-case': [0]
    }
}
```

### 3.验证测试

#### 输入错误的示范

```shell
git commit -m 'aa'
```

输出结果

```shell
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
⧗   input: aa
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

#### 正确示范

```shell
git commit -m 'feat: 新增git提交规范检测 husky'
```

如果想绕过/跳过代码检查 直接提交代码

```javascript
git commit -m "test" --no-verify
```

目前没有 lint-staged 也就是没有提交代码(`git commit`)自动格式化

## 十、提交时检测代码规范 pre-commit

在 **`ESLint` 与 `Prettier` 配合解决代码格式问题** 的章节中，我们讲解了如何处理 **本地！代码格式问题。**

但是这样的一个格式处理问题，他只能够在本地进行处理，并且我们还需要 **手动在 `VSCode` 中配置自动保存** 才可以。那么这样就会存在一个问题，要是有人忘记配置这个东西了怎么办呢？他把代码写的乱七八糟的直接就提交了怎么办呢？

那么想要完成这么一个操作就需要使用 `husky` 配合 `eslint` 才可以实现。

**创建 pre-commit 文件，路径为`.husky/pre-commit`**

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Format and submit code according to lintstagedrc.js configuration
npm run lint:lint-staged
```

**接下来就是：提交代码时发现格式不对，自动格式化再提交：lint-staged 自动修复格式错误**

## 十、lint-staged 提交 commit 时自动修复格式错误

它帮我们解决如下 2 个问题

1. 我们只修改了个别的文件，没有必要使用`eslint`默认检测所有的文件代码格式(虽然如[Eslint](https://so.csdn.net/so/search?q=Eslint&spm=1001.2101.3001.7020)之类的也有文件过滤配置，但毕竟还是对于匹配文件的全量遍历，如全量的`.js`文件，有时还会误格式化其他同学的代码)，而`lint-staged`， 是一个仅仅过滤出 Git 代码暂存区文件(被 committed 的文件)的工具
2. 默认情况下只能给我们提示出对应的错误，我们还需要手动的进行代码修改

[lint-staged](https://github.com/okonet/lint-staged) 可以让你当前的代码检查 **只检查本次修改更新的代码，并在出现错误的时候，自动修复并且推送**

### 安装

```shell
npm i lint-staged -D
```

### 配置`package.json`

`lint-staged`仅仅是文件过滤器，不会帮你格式化任何东西，所以没有代码规则配置文件，需要自己配置一下，如：`.eslintrc`、`.stylelintrc`等，然后在`package.json`中引入。

```json
"scripts": {
    "lint:lint-staged": "lint-staged"
},
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      // "prettier --write",// 如果报错可以删除 折行 因为json文件不能用注释
      "git add"
    ],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
      "prettier --write--parser json"
    ],
    "package.json": [
      "prettier --write",
      "git add"
    ],
    "*.{scss,less,styl,html}": [
      "stylelint --fix",
      // "prettier --write",// 如果报错可以删除 折行 因为json文件不能用注释
      "git add"
    ],
    "*.md": [
      "prettier --write",
      "git add"
    ]
  }
```

如上配置，每次它只会在你本地 `commit` 之前，校验你提交的内容是否符合你本地配置的 `eslint`规则(校验会出现两种结果：

1. 如果符合规则：则会提交成功。
2. 如果不符合规则：它会自动执行 `eslint --fix` 尝试帮你自动修复，如果修复成功则会帮你把修复好的代码提交`git add`，如果失败，则会提示你错误，让你修复好这个错误之后才能允许你提交代码

> TIPS：`自动修正` 功能只能修正部分代码风格规范，对于一些可能产生隐患的代码问题不会自动修正（例如：定义而未使用的变量）。

## 十一、ts报错问题

### [react-router](https://so.csdn.net/so/search?q=react-router&spm=1001.2101.3001.7020) v6配置时类型错误

根据react v16 的文档去配置项目中的路由时发现

![1689558766827-2023-7-17_09:52:47.png](https://gitee.com/cheerqjy/utools-picture/raw/master/1689558766827-2023-7-17_09:52:47.png)

> 路由配置文件后缀名应为 jsx或者tsx，因为使用到了tsx语法，并且需要引入react。

## 参考

全面：https://guojiongwei.top/article/628da9d838ee2f11cc64a022

https://juejin.cn/post/6844904083682279432#heading-8

https://blog.csdn.net/guxin_duyin/article/details/127048203

eslint：https://blog.devgenius.io/eslint-prettier-typescript-and-react-in-2022-e5021ebca2b1