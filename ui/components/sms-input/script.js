import InputScript from '~ui/components/input/script.js';
import axios from '~/plugins/axios.js';
import encrypt from '~ui/utils/encrypt.js';
import { notify } from '@kyvg/vue3-notification';

export default {

    mixins: [
        InputScript,
    ],

    props: {
        type: {
            required: false,
            default: 'login',
            type: String,
            validator: type => {
                return ['register', 'login'].includes(type);
            },
        },
        captchaInput: {
            required: true,
        },
        phoneInput: {
            required: true,
        },
    },

    data() {
        return {
            loading: false,
            countdown: 0,
        }
    },

    computed: {
        buttonContent() {
            if (this.countdown > 0) {
                return `${this.countdown} 秒后重试`;
            }
            return '获取验证码';
        },
    },

    methods: {
        sendSms () {

            let [phoneError, captchaError] = [
                this.phoneInput.validateManually(),
                this.captchaInput.validateManually(),
            ];

            if (
                !phoneError && !captchaError
            ) {
                axios
                    .post(`/send/sendSms`, {
                        phoneNumber: encrypt(this.phoneInput.modelValue),
                        type: this.type,
                        code: this.captchaInput.modelValue,
                        uuid: this.captchaInput.uuid,
                    })
                    .then(() => {
                        notify({
                            type: 'green',
                            text: '短信发送成功，1 分钟内有效',
                        });
                        this.countdown = 60;
                        let timer = setInterval(() => {
                            this.countdown--;
                            if (this.countdown === 0) {
                                clearInterval(timer);
                            }
                        }, 1000);
                    })
                    .catch(() => {
                        this.captchaInput.refreshCaptcha();
                        this.captchaInput.refresh();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
                
            }
        }
    }
}