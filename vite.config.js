import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const path = require('path');

export default ({ mode }) => {

	process.env = {
		...process.env,
		...loadEnv(mode, process.cwd())
	};

	return defineConfig({

		base: process.env.VITE_APP_BASE,
	
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
                '~ui': path.resolve(__dirname, './ui'),
			},
		},

		// for those who develop in a virtual machine
		server: {
			host: '0.0.0.0',
			watch: {
				usePolling: true,
			},
			hmr: {
				host: process.env.VITE_APP_HOST,
			},
		},

		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		],
	})
};