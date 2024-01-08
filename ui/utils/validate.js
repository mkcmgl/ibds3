
// 预设值：
// phone 手机号码
// email 邮箱
// url 链接
// json json 格式的 string
// password 密码
// password-confirm:password 确认密码
// id-card 身份证号码
// social-credit-code 社会信用代码
// no-emoji 不允许输入 emoji
// no-space 不允许输入空格
// number-chars-line-only 数字、字母、下划线\横线

const validate = (
    value,
    rule,
    message,
    type
) => {

    if (
        [
            'phone',
            'email',
            'url',
            'json',
            'password',
            'password-confirm',
            'id-card',
            'social-credit-code',
            'no-emoji',
            'no-space'
        ].includes(type)
        || [
            'password-confirm:'
        ].find(item => type.startsWith(item))
    ) {
        value = value.toString();
    }

    if (
        rule === 'phone'
        && !/^1[3456789]\d{9}$/.test(value)
    ) {
        return message || ':attr 格式不正确';
    }
    else if (
        rule === 'email'
        && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
    ) {
        return message || ':attr 格式不正确';
    }
    else if (
        rule === 'url'
        && !/(http|https|mailto|ftp|sftp):\/\/([\w.]+\/?)\S*/.test(value)
    ) {
        return message || ':attr 格式不正确';
    }
    else if (
        rule === 'json'
    ) {
        try {
            JSON.parse(value);
        } catch (e) {
            return message || ':attr 不是正确的 JSON 格式';
        }
    }
    else if (
        rule === 'password'
    ) {
        if (value.length < 6) {
            return message || ':attr 长度不能小于 6 位';
        }
        else if (value.length > 20) {
            return message || ':attr 长度不能大于 20 位';
        }
        else if (!/\d/.test(value)) {
            return message || ':attr 必须包含数字';
        }
        else if (!/[A-Z]/.test(value)) {
            return message || ':attr 必须包含大写字母';
        }
        else if (!/[a-z]/.test(value)) {
            return message || ':attr 必须包含小写字母';
        }
        else if (
            !(new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(value))
        ) {
            return message || ':attr 必须包含特殊字符';
        }
        else if (/\s/.test(value)) {
            return message || ':attr 不能包含空格';
        }
        else if (
            value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu)
        ) {
            return message || ':attr 包含非法字符';
        }
    }
    else if (
        rule.startsWith('password-confirm:')
    ) {
        const password = rule.split(':')[1];
        if (value !== password) {
            return message || ':attr 与 密码 不一致';
        }
    }
    else if (
        rule === 'id-card'
        && !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value)
    ) {
        return message || ':attr 格式不正确';
    }
    else if (
        rule === 'social-credit-code'
        && !/^[0-9A-Z]{18}$/.test(value)
    ) {
        return message || ':attr 格式不正确';
    }
    else if (
        rule === 'no-emoji'
        && value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu)
    ) {
        return message || ':attr 包含非法字符';
    }
    else if (
        rule === 'no-space'
        && /\s/.test(value)
    ) {
        return message || ':attr 不能包含空格';
    }
    else if (
        rule === 'number-chars-line-only'
        && !/^[0-9a-zA-Z_-]+$/.test(value)
    ) {
        return message || ':attr 只能包含数字、字母、下划线和中划线';
    }


    // 通用校验
    // string
    if (type === 'string') {
        value = value.toString();
        if (
            rule.startsWith('min:')
            && value.length < rule.split(':')[1]
        ) {
            return message || `:attr 长度不能小于 ${rule.split(':')[1]} 位`;
        }
        else if (
            rule.startsWith('max:')
            && value.length > rule.split(':')[1]
        ) {
            return message || `:attr 长度不能大于 ${rule.split(':')[1]} 位`;
        }
        else if (
            rule.startsWith('length:')
            && value.length !== rule.split(':')[1]
        ) {
            return message || `:attr 长度必须为 ${rule.split(':')[1]} 位`;
        }
        else if (
            rule.startsWith('regex:')
            && !new RegExp(rule.split(':')[1]).test(value)
        ) {
            return message || ':attr 格式不正确';
        }
    }
    // number
    else if (type === 'number') {
        value = Number(value);

        // 先校验是否是合法的数字类型
        if (isNaN(value)) {
            return message || ':attr 不是合法的数字';
        }
        else if (
            rule.startsWith('min:')
            && value < rule.split(':')[1]
        ) {
            return message || `:attr 不能小于 ${rule.split(':')[1]}`;
        }
        else if (
            rule.startsWith('max:')
            && value > rule.split(':')[1]
        ) {
            return message || `:attr 不能大于 ${rule.split(':')[1]}`;
        }
    }
    // file
    else if (type === 'file') {
        if (
            rule.startsWith('min:')
            && value.size < rule.split(':')[1]
        ) {
            return message || `:attr 大小不能小于 ${rule.split(':')[1]} 字节`;
        }
        else if (
            rule.startsWith('max:')
            && value.size > rule.split(':')[1]
        ) {
            return message || `:attr 大小不能大于 ${rule.split(':')[1]} 字节`;
        }
        else if (
            rule.startsWith('suffixs:')            
        ) {
            let suffixs = rule.split(':')[1].split(',');
            if (!suffixs.includes(value.name.split('.').pop())) {
                return message || `不合法的文件类型`;
            }
        }
    }
    
    return null;
}

export default (
    value,
    rules,
    messages = {},
) => {

    let error = null,
        type = rules.find(rule => {
            return ['string', 'number', 'file'].includes(rule);
        }) ?? 'string';

    // 先校验是否是必填
    if (
        rules.includes('required')
        && (
            (
                type === 'string'
                && (value === null || value === undefined || value === '' || value.toString().trim() === '')
            )
            || (
                type === 'number'
                && (value === null || value === undefined || value == '')
            )
            || (
                type === 'file'
                && (value === null || value === undefined || value.size === 0 || value === '')
            )
        )
    ) {
        return messages.required ?? ':attr 不能为空';
    }

    // 不要再自动添加默认校验规则了，显示地添加可以避免重复添加
    for (let i = 0; i < rules.length; i++) {
        
        let rule = rules[i];

        if (typeof rule === 'function') {
            error = rule(value);
        }
        else {
            let message = Object.keys(messages).includes(rule.split(':')[0])
                ? messages[rule.split(':')[0]]
                : null;
            
            error = validate(value, rule, message, type);
        }

        if (error) {
            break;
        }
    }

    return error;
}