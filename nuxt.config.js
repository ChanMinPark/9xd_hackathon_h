module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Gam-Gi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      {src:'https://www.youtube.com/iframe_api'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'bulma',
    '~/assets/css/main.css'
  ],
  /*
  ** Add axios globally
  */
  env: {
    // baseUrl: 'http://9xd-team-h.walkinpcm.com',
    // serverUrl: 'http://9xd-team-h.walkinpcm.com'
    baseUrl: 'http://localhost:8000',
    serverUrl: 'http://52.79.159.96:3000'
  },
  plugins: [
    { src: '~/plugins/youtube.js', ssr: false }
  ],
  build: {
    vendor: ['axios','socket.io-client','vue-youtube-embed'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
