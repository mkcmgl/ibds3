import axios from '~/plugins/axios.js';
import save from '~ui/utils/save.js'

export default {

    data() {
        return {
            downloading: false,
        }
    },

    methods: {
        downloadFile({ txHash, fileName }) {
            this.downloading = true;

            let url = `/proof/file/download?txHash=${txHash}`;

            if (this.file.encryptMode == 2) {
                url += '&channelId=' + this.file.channelId;
            }

            axios.get(
                    url,
                    {
                        responseType: 'blob'
                    }
                )
                .then(({ data }) => {
                    save(data, fileName);
                })
                .finally(() => {
                    this.downloading = false;
                });
        }
    }
}