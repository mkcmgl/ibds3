import { createWebHashHistory, createRouter } from 'vue-router';
import auth from '~/middlewares/auth.js';
import guest from '~/middlewares/guest.js';
import admin from '~/middlewares/admin.js';
import verified from '~/middlewares/verified.js';
import unverified from '~/middlewares/unverified.js';

const routes = [
    {
        path: '/',
        component: () => import('~/components/layout.vue'),
        beforeEnter: auth,
        children: [
            {
                path: '',
                redirect:'index'
            },
            {
                path: 'index',
                name: 'index',
                component: () => import('~/pages/index.vue'),
            },
            {
                path: 'accountCenter',
                name: 'accountCenter',
                component: () => import('~/pages/account-center.vue'),
            },
            {
                path: 'relations',
                name: 'relations',
                component: () => import('~/pages/relations/index.vue'),
                beforeEnter: verified,
            },
            {
                path: 'relations/maps',
                name: 'relations/maps',
                component: () => import('~/pages/relations/maps.vue'),
                beforeEnter: verified,
            },
            {
                path: 'certificates/data',
                name: 'certificates/data',
                component: () => import('~/pages/certificates/data.vue'),
                beforeEnter: verified,
            },
            {
                path: 'certificates/files',
                name: 'certificates/files',
                component: () => import('~/pages/certificates/files.vue'),
                beforeEnter: verified,
            },
            {
                path: 'services/api',
                name: 'services/api',
                component: () => import('~/pages/services/api.vue'),
                beforeEnter: verified,
            },
            {
                path: 'services/configs',
                name: 'services/configs',
                component: () => import('~/pages/services/configs.vue'),
                beforeEnter: verified,
            },
            {
                path: 'timestamps',
                name: 'timestamps',
                component: () => import('~/pages/timestamps/index.vue'),
                beforeEnter: verified,
            },
            {
                path: 'randoms',
                name: 'randoms',
                component: () => import('~/pages/randoms/index.vue'),
                beforeEnter: verified,
            },
            {
                path: 'randoms/:id',
                name: 'randoms/show',
                props: true,
                component: () => import('~/pages/randoms/show.vue'),
                beforeEnter: verified,
            },
            {
                // 数据资源
                // 资源管理
                path: 'resources',
                name: 'resources',
                component: () => import('~/pages/resources/index.vue'),
                beforeEnter: verified,
            },
            {
                // 资源注册
                path: 'resources/create',
                name: 'resources/create',
                component: () => import('~/pages/resources/create.vue'),
                beforeEnter: verified,
            },
            {
                // 管理目录
                path: 'resources/catalogs',
                name: 'resources/catalogs',
                component: () => import('~/pages/resources/catalogs.vue'),
                beforeEnter: verified,
            },
            {
                // 数据源
                path: 'resources/sources',
                name: 'resources/sources',
                component: () => import('~/pages/resources/sources.vue'),
                beforeEnter: verified,
            },

            {
                path: 'resources/:id',
                name: 'resources/show',
                props: true,
                component: () => import('~/pages/resources/show.vue'),
                beforeEnter: verified,
            },
            {
                path: 'resources/:id/edit',
                name: 'resources/edit',
                props: true,
                component: () => import('~/pages/resources/edit.vue'),
                beforeEnter: verified,
            },

            {
                // 虚拟通道
                path: 'channels',
                name: 'channels',
                component: () => import('~/pages/channels/index.vue'),
                beforeEnter: verified,
            },
            {
                path: 'channels/:id',
                name: 'channels/show',
                props: true,
                component: () => import('~/pages/channels/show.vue'),
                beforeEnter: verified,
            },

            // 审计侧链
            // 审计侧链标签
            {
                path: 'audit-chains/tags',
                name: 'audit-chains/tags',
                component: () => import('~/pages/audit-chains/tags.vue'),
                beforeEnter: verified,
            },
            {
                path: 'audit-chains/tags/:id/edit',
                name: 'audit-chains/tags/edit',
                props: true,
                component: () => import('~/pages/audit-chains/tags/edit.vue'),
                beforeEnter: verified,
            },
            {
                path: 'audit-chains/tags/:id/cert/:identityId',
                name: 'audit-chains/tags/cert',
                props: true,
                component: () => import('~/pages/audit-chains/tags/cert.vue'),
                beforeEnter: verified,
            },
            {
                // 区块
                path: 'audit-chains/blocks',
                name: 'audit-chains/blocks',
                component: () => import('~/pages/audit-chains/blocks.vue'),
                beforeEnter: verified,
            },
            {
                // 交易
                path: 'audit-chains/txs',
                name: 'audit-chains/txs',
                component: () => import('~/pages/audit-chains/txs.vue'),
                beforeEnter: verified,
            },
            {
                // 统计汇总
                path: 'audit-chains/summary',
                name: 'audit-chains/summary',
                component: () => import('~/pages/audit-chains/summary.vue'),
                beforeEnter: verified,
            },
            {
                path: 'audit-chains/summary/detail',
                name: 'audit-chains/summary/detail',
                component: () => import('~/pages/audit-chains/summary/detail.vue'),
                beforeEnter: verified,
            },

            {
                // 实名认证
                path: 'verification/create',
                name: 'verification/create',
                component: () => import('~/pages/verification/create.vue'),
                beforeEnter: unverified,
            },
            {
                // admin 审核 index
                path: 'verifications',
                name: 'verifications',
                component: () => import('~/pages/verifications/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 审核 show
                path: 'verifications/:id',
                name: 'verifications/show',
                props: true,
                component: () => import('~/pages/verifications/show.vue'),
                beforeEnter: admin,
            },
            {
                // admin 数据统计 index
                path: 'dataStatistics',
                name: 'dataStatistics',
                component: () => import('~/pages/data-statistics/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 数据统计 detail
                path: 'dataStatistics/:id',
                name: 'dataStatistics/detail',
                props: true,
                component: () => import('~/pages/data-statistics/show.vue'),
                beforeEnter: admin,
            },
            {
                // admin 数据存证 index
                path: 'dataStorage',
                name: 'dataStorage',
                component: () => import('~/pages/data-storage/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 菜单管理 index
                path: 'system/menu',
                name: 'system/menu',
                component: () => import('~/pages/system/system-menu/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 角色管理 index
                path: 'system/roles',
                name: 'system/roles',
                component: () => import('~/pages/system/system-roles/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 用户管理 index
                path: 'system/user',
                name: 'system/user',
                component: () => import('~/pages/system/system-user/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 基础配置 index
                path: 'system/setting',
                name: 'system/setting',
                component: () => import('~/pages/system/system-settings/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 基础配置 index
                path: 'system/setting/edit-personalized',
                name: 'system/setting/edit-personalized',
                component: () => import('~/pages/system/system-settings/edit-personalized/index.vue'),
                beforeEnter: admin,
            },
            {
                // admin 证书模板 index
                path: 'system/certificateTemplate',
                name: 'system/certificateTemplate',
                component: () => import('~/pages/system/certificate-template/index.vue'),
                beforeEnter: admin,
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('~/pages/login.vue'),
        beforeEnter: guest,
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('~/pages/register.vue'),
        beforeEnter: guest,
    },
    {
        path: '/forget-password',
        name: 'forget-password',
        component: () => import('~/pages/forget-password.vue'),
        beforeEnter: guest,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('~/pages/not-found.vue'),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;