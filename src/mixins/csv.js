import CsvIcon from '~/components/icons/csv.vue';
import CsvExportDialog from '~/components/csv-export-dialog.vue';

export default {

    components: {
        CsvIcon,
        CsvExportDialog,
    },

    data() {
        return {
            showCSVExportDialog: false,
        }
    },

}