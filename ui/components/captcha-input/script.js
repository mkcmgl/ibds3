import InputScript from '~ui/components/input/script.js';
import axios from '~/plugins/axios.js';

export default {

    data() {
        return {
            loading: false,
            captcha: '',
        };
    },

    mixins: [
        InputScript,
    ],

    props: {
        uuid: {
            type: String,
            required: true,
        },
    },

    emits: [
        'update:uuid',
    ],

    mounted() {
        this.refreshCaptcha();
    },

    methods: {
        refreshCaptcha() {
            this.loading = true;
            axios.get('/captchaImage')
                .then(({ data }) => {
                    let { uuid, img } = data;
                    this.$emit('update:uuid', uuid);
                    this.captcha = `data:image/gif;base64,${img}`;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    }
}