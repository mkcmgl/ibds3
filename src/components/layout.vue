<template>
    <div class="
            w-[250px] h-[calc(100vh-theme('space.14'))] fixed top-14 left-0 bg-white text-slate-700
            flex flex-col
            scrollbar-trigger-wrapper
        ">
        <aside class="block h-screen w-full overflow-y-auto">

            <nav>
                <!-- <p class=" select-none list-none text-sm">
                    <router-link active-class="bg-blue-600/25 border-blue-600" class="block px-6 py-4 " to="index" v-wave
                        v-html="`
                <i class='mdi mdi-account-multiple'></i>
                概览
            `">
                    </router-link>
                </p> -->
                <sidebar-item v-for="item in sidebarItems" :key="item.label" :item="item" />
            </nav>

        </aside>
    </div>

    <header class="w-full bg-white px-8 shadow-sm h-14 flex items-center fixed z-30 top-0 left-0">

        <nav>
            <router-link class="
                    flex items-center cursor-pointer
                " :to="{
                    name: 'index'
                }">
                <img class="h-8 mr-2" src="/images/logo.png" alt="区块链开发服务系统">
                <span class="">
                    区块链开发服务系统
                </span>
            </router-link>
        </nav>

        <i-dropdown class="w-[150px] ml-auto">

            <span class="h-14 flex items-center">
                <img class="block mr-2 h-8" src="/images/default-avatar.png" alt="用户头像">
                {{ user.userName }}
            </span>

            <template #list>
                <li>
                    <router-link :to="{
                        name: 'accountCenter'
                    }">
                        账户中心
                    </router-link>
                </li>
                <li>
                    <button type="button" @click="showLogoutDialog = true">
                        注销
                    </button>
                </li>
            </template>

        </i-dropdown>

    </header>

    <main class="ml-[calc(250px+theme('space.8'))] mr-8 pb-8 pt-14">
        <router-view />
    </main>

    <i-dialog v-model="showLogoutDialog" :loading="logoutting" prevent>

        <template #title>
            <i class="mdi mdi-alert text-red-600 mr-2"></i>
            注销
        </template>

        <template v-slot="props" #default>
            <form @submit.prevent="logout" class="pb-6 px-6">

                <p class="my-4">
                    <span class="text-gray-500">您确定要注销吗？</span>
                </p>

                <footer class="flex items-center justify-between">

                    <button
                        class="border-slate-200 border-2 block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] w-32"
                        type="button" v-wave @click="props.close">
                        取消
                    </button>

                    <i-button class="w-32" :loading="logoutting">
                        确定
                    </i-button>
                </footer>

            </form>

        </template>
    </i-dialog>
</template>

<script setup>
import SidebarItem from './sidebar-item.vue';
import IDropdown from '~ui/components/dropdown/component.vue';
import IDialog from '~ui/components/dialog/component.vue';
import IButton from '~ui/components/button/component.vue';
</script>

<script>

import LayoutScript from '~ui/components/layout/script.js';
import { useAuth } from '~/store/auth.js';

const verifiedUserRoutes = [
    {
        label: `
            <i class='mdi mdi-account-multiple'></i>
            概览
        `,
        noChildren: true,
        route: {
            name: 'index'
        }

    },
    {
        label: `
            <svg xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                viewBox='0 0 15 15'>
                <g transform='translate(-43 -192.842)'>
                    <g transform='translate(43.183 193.412)'>
                        <path d='M71.281,551.418a.562.562,0,0,0-.057-.151l-.078-.116a.514.514,0,0,0-.1-.1l-.12-.083a.7.7,0,0,0-.2-.074l-.124-.013H68.614a.715.715,0,0,0,0,1.429h.253l-3.416,3.416L62.4,552.674a.713.713,0,0,0-1.009,0l-4.35,4.349a.715.715,0,0,0,0,1.008.7.7,0,0,0,.506.21.693.693,0,0,0,.5-.21l3.845-3.843,3.053,3.052a.712.712,0,0,0,1.011,0l3.92-3.92v.253a.715.715,0,0,0,1.429,0V551.6A.789.789,0,0,0,71.281,551.418Z' transform='translate(-56.829 -550.883)'/>
                        <path d='M58.453,557.553a.716.716,0,0,0-.715.715v3.89a.715.715,0,0,0,1.429,0v-3.89A.716.716,0,0,0,58.453,557.553Z' transform='translate(-56.553 -548.854)'/>
                        <path d='M61.3,555.432a.715.715,0,0,0-.715.713V562.8a.715.715,0,0,0,1.429,0v-6.658A.715.715,0,0,0,61.3,555.432Z' transform='translate(-55.685 -549.499)'/>
                        <path d='M67.009,554.522a.715.715,0,0,0-.715.713v7.845a.715.715,0,0,0,1.429,0v-7.845A.715.715,0,0,0,67.009,554.522Z' transform='translate(-53.95 -549.776)'/>
                        <path d='M64.157,556.947a.715.715,0,0,0-.715.713v4.682a.715.715,0,0,0,1.429,0V557.66A.715.715,0,0,0,64.157,556.947Z' transform='translate(-54.817 -549.038)'/>
                    </g>
                </g>
            </svg>
            数据溯源
        `,
        items: [
            {
                label: '关系图谱',
                route: {
                    name: 'relations/maps'
                }
            },
            {
                label: '关系管理',
                route: {
                    name: 'relations'
                }
            }
        ]
    },
    {
        label: `
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlns:xlink='http://www.w3.org/1999/xlink'
                width='15'
                height='15'
                viewBox='0 0 15 15'>
                <g transform='translate(-40 -291.909)'>
                    <g transform='translate(40.342 292.342)'>
                        <g> 
                            <path d='M6.672,3.365A.663.663,0,0,0,7.334,2.7V2.166a.663.663,0,0,0-1.325,0V2.7a.663.663,0,0,0,.663.663' transform='translate(1.517 0.379)'/>
                            <path d='M14.029,2.347,11.879.2a.657.657,0,0,0-.466-.2H1.737A1.741,1.741,0,0,0,0,1.738V12.488a1.741,1.741,0,0,0,1.737,1.738h10.75a1.74,1.74,0,0,0,1.737-1.738V2.814a.658.658,0,0,0-.2-.467M9.775,7.525H4.48A1.793,1.793,0,0,0,2.689,9.317V12.9H1.74a.412.412,0,0,1-.412-.412V1.738a.412.412,0,0,1,.412-.412H3.5V4.077A1.552,1.552,0,0,0,5.046,5.626H9.185a1.552,1.552,0,0,0,1.551-1.549V1.316l.376-.028L12.9,3.029v9.459a.413.413,0,0,1-.413.412h-.922V9.317A1.794,1.794,0,0,0,9.775,7.525M4.014,9.317a.472.472,0,0,1,.466-.466H9.747a.472.472,0,0,1,.466.466V12.9h-6.2ZM9.408,4.077a.229.229,0,0,1-.224.224H5.045a.23.23,0,0,1-.225-.224V1.326H9.408Z' transform='translate(0 -0.001)'/>
                        </g>
                    </g>
                </g>
            </svg>
            存证管理
        `,
        items: [
            {
                label: '数据存证管理',
                route: {
                    name: 'certificates/data'
                }
            },
            {
                label: '文件存证管理',
                route: {
                    name: 'certificates/files'
                }
            }
        ]
    },

    {
        label: `
            <i class='mdi mdi-clock-outline'></i>
            时间戳
        `,
        items: [
            {
                label: '可信时间戳',
                route: {
                    name: 'timestamps'
                }
            }
        ]
    },

    {
        label: `
            <i class='mdi mdi-numeric'></i>
            随机数
        `,
        items: [
            {
                label: '可信随机数',
                route: {
                    name: 'randoms'
                }
            }
        ]
    },

    {
        label: `
            <i class='mdi mdi-highway'></i>
            虚拟通道
        `,
        items: [
            {
                label: '虚拟通道',
                route: {
                    name: 'channels'
                }
            }
        ]
    },

    {
        label: `
            <i class='mdi mdi-source-branch'></i>
            数据资源
        `,
        items: [
            {
                label: '管理目录',
                route: {
                    name: 'resources/catalogs'
                }
            },
            {
                label: '数据源',
                route: {
                    name: 'resources/sources'
                }
            },
            {
                label: '资源注册',
                route: {
                    name: 'resources/create'
                }
            },
            {
                label: '资源管理',
                route: {
                    name: 'resources'
                }
            },
        ]
    },
    {
        label: `
            <i class='mdi mdi-account-multiple'></i>
            审计侧链
        `,
        items: [
            {
                label: '侧链标签',
                route: {
                    name: 'audit-chains/tags'
                }
            },
            {
                label: '审计侧链区块',
                route: {
                    name: 'audit-chains/blocks'
                }
            },
            {
                label: '审计侧链交易',
                route: {
                    name: 'audit-chains/txs'
                }
            },
            {
                label: '统计汇总',
                route: {
                    name: 'audit-chains/summary'
                }
            }
        ]
    },

    {
        label: `
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                viewBox='0 0 15 15'>
                <g transform='translate(-39 -344)'>
                    <g transform='translate(39.305 344.289)'>
                        <path class='b' d='M85.339,559.9H76.918a2.2,2.2,0,0,0-4.171,0h-.415a.7.7,0,0,0,0,1.4h.415a2.2,2.2,0,0,0,4.173,0h8.42a.7.7,0,0,0,0-1.4Zm-10.506-.1a.8.8,0,1,1-.8.8A.8.8,0,0,1,74.833,559.8Z' transform='translate(-71.633 -548.397)'/>
                        <path class='b' d='M85.339,556.129H83.922a2.2,2.2,0,0,0-4.171,0H72.332a.7.7,0,0,0,0,1.4H79.75a2.2,2.2,0,0,0,1.405,1.392,2.174,2.174,0,0,0,.681.109,2.2,2.2,0,0,0,2.085-1.5h1.417a.7.7,0,0,0,0-1.4Zm-3.5-.1a.8.8,0,1,1-.8.8A.8.8,0,0,1,81.837,556.027Z' transform='translate(-71.633 -549.626)'/>
                        <path class='b' d='M72.332,553.753h2.415a2.209,2.209,0,0,0,1.406,1.394,2.175,2.175,0,0,0,.681.109,2.2,2.2,0,0,0,2.086-1.5h6.418a.7.7,0,0,0,0-1.4H78.919a2.2,2.2,0,0,0-4.173,0H72.332a.7.7,0,0,0,0,1.4Zm4.5-1.5a.8.8,0,1,1-.8.8A.8.8,0,0,1,76.834,552.252Z' transform='translate(-71.633 -550.854)'/>
                    </g>
                </g>
            </svg>
            接口服务
        `,
        items: [
            {
                label: '封装 API',
                route: {
                    name: 'services/api'
                }
            },
            {
                label: '配置管理',
                route: {
                    name: 'services/configs'
                }
            }
        ]
    }
];

const unverifiedUserRoutes = [
    {
        label: `
            <i class='mdi mdi-account-multiple'></i>
            概览
        `,
        noChildren: true,
        route: {
            name: 'index'
        }

    },
    {
        label: `
            <i class='mdi mdi-account'></i>
            实名认证
        `,
        items: [
            {
                label: '实名认证',
                route: {
                    name: 'verification/create'
                }
            }
        ]
    }
];

const adminRoutes = [
    {
        label: `
            <i class='mdi mdi-account-multiple'></i>
            概览
        `,
        noChildren: true,
        route: {
            name: 'index'
        }

    },
    {
        label: `
            <i class='mdi mdi-account-multiple'></i>
            实名认证审核
        `,
        items: [
            {
                label: '实名认证审核',
                route: {
                    name: 'verifications'
                }
            }
        ]
    },
    {
        label: `
            <i class='mdi mdi-source-branch'></i>
            数据统计
        `,
        items: [
            {
                label: '数据统计',
                route: {
                    name: 'dataStatistics'
                }
            }
        ]
    },
    {
        label: `
            <i class='mdi mdi-source-branch'></i>
            电子证照数据列表
        `,
        items: [
            {
                label: '电子证照数据列表',
                route: {
                    name: 'dataStorage'
                }
            }
        ]
    },
    {
        label: `
            <i class='mdi mdi-source-branch'></i>
            系统管理
        `,
        items: [
            {
                label: '菜单管理',
                route: {
                    name: 'system/menu'
                }
            }, {
                label: '角色管理',
                route: {
                    name: 'system/roles'
                }
            }, {
                label: '用户管理',
                route: {
                    name: 'system/user'
                }
            }, {
                label: '基础配置',
                route: {
                    name: 'system/setting'
                }
            }, {
                label: '证书模板',
                route: {
                    name: 'system/certificateTemplate'
                }
            }
        ]
    },
];

export default {

    mixins: [
        LayoutScript,
    ],

    computed: {

        user() {
            return useAuth().user;
        },

        sidebarItems() {
            if (useAuth().isAdmin) {
                return adminRoutes;
            }
            else {
                return useAuth().isVerified
                    ? verifiedUserRoutes
                    : unverifiedUserRoutes;
            }
        }
    },
}
</script>