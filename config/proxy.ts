/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/sfc': {
      // 要代理的地址
      target: 'http://localhost:7076',
      changeOrigin: true,
    },
    '/api/': {
      target: 'http://localhost:8487',
      changeOrigin: true,
    },
  },
  qa: {
    '/api/': {
      target: 'http://mlxdg1vlqaims01:8487',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    '/api/': {
      target: 'https://dg1.ml.molex.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
