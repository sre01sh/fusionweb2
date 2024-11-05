// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  devtool: 'source-map',
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  // proxy: {
  //   '/api/authenticate': {
  //     target: 'http://localhost:8500',
  //     changeOrigin: true,
  //   },
  // },
});