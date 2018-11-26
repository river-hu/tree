module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)$/)
      .use('url-loader')
        .loader('url-loader')
        .tap(options => {
          // 修改它的选项...
          return {
            limit: 10000,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
          }
        })
  },
}