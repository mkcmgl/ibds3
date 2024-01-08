/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,vue}',
        './ui/**/*.{js,vue}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': [
                    'Poppins',
                    'Noto Sans SC',
                    ...defaultTheme.fontFamily.sans
                ],
            },
        },
    },
    plugins: [],
}
