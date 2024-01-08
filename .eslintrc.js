module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",

    ],
    "rules": {
        'unicode-bom': 0,//要求或禁止 Unicode BOM
        'no-const-assign': 2,//禁止修改 const 声明的变量
        'no-duplicate-case': 2,//禁止重复的 case 标签
        'no-unused-vars': 2,//禁止未使用的变量
        'use- isnan': 2,//禁止比较时使用NaN，只能用isNaN 
        'default-case': 2,//switch语句最后必须有default 
        'init-declarations': 2,//声明时必须赋初值
        'no-undef': 'off',
        'no-labels': 'off',
        'camelcase': 'off',
        'eqeqeq': 0,//允许双等号
        'comma-dangle': 0,//结尾符换行
        'no-mixed-spaces-and-tabs': 0,//混合空格制表符校验
        'quotes': [0, "single"],
        'semi': [0, 'always'],// 语句强制分号结尾
        'space-before-function-paren': 0,// 函数定义时括号前面要不要有空格
    }
}
