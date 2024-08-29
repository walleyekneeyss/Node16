const { createProxyMiddleware } = require('http-proxy-middleware'); // 此处不使用import语法

module.exports = function (app) {
  // http://121.89.205.189:3001/api/pro/list ==> /myapi/pro/list
  app.use(
    '/myapi', //myapi是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
    createProxyMiddleware({
      target: 'http://121.89.205.189:3000/api', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值，为true时，服务器收到的请求头中的host为上面配置的地址
      pathRewrite: { '^/myapi': '' }, //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    createProxyMiddleware({
      target: 'http://121.89.205.189:3001/api',
      changeOrigin: true,
      pathRewrite: { '^/myapi2': '' },
    })
  );
};
