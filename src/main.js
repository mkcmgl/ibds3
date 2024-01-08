import '~/assets/index.scss';
import '~ui/assets/index.scss';
// @mdi/font
import '@mdi/font/css/materialdesignicons.min.css';
import 'highlight.js/styles/stackoverflow-light.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VWave from 'v-wave';
import Notifications from '@kyvg/vue3-notification';
import ClickOutside from 'click-outside-vue3';
import { createMetaManager, plugin as metaPlugin } from 'vue-meta';

import App from '~/App.vue';
import router from '~/router.js';

import CatalogsTreeItem from '~/prefabs/resources/catalogs/catalogs-tree-item.vue';
import CatalogInputTreeItem from '~/prefabs/resources/create/catalog-input-tree-item.vue';

import globalMixin from '~ui/mixins/global.js';

createApp(App)
    // 嵌套组件必须全局注册
    .component('catalogs-tree-item', CatalogsTreeItem)
    .component('catalog-input-tree-item', CatalogInputTreeItem)
    .mixin(globalMixin)
    .use(createMetaManager())
    .use(metaPlugin)
    .use(createPinia())
    .use(router)
    .use(ClickOutside)
    .use(ElementPlus)
    .use(VWave, {
        color: 'currentColor',
    })
    .use(Notifications)
    .mount('#app');