export default {

    tailwindClass: [
        `text-blue-500 bg-blue-50 border-blue-500`,
        `text-red-500 bg-red-50 border-red-500`,
        `text-green-500 bg-green-50 border-green-500`,
    ],

    methods: {
        getColorClasses (type = 'blue') {
            return `text-${type}-500 bg-${type}-50 border-${type}-500`;
        }
    }
}