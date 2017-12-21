const episodes = require('./server/sitemap').episodes

module.exports = {
  router: {
    // https://ja.nuxtjs.org/api/configuration-router#scrollBehavior
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        // Scroll to top as default
        let position = { x: 0, y: 0 }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  modules: [ '@nuxtjs/pwa', '~/modules/rss', 'nuxtent' ],
  css: [
    '~/assets/css/reset.scss',
    '~/assets/css/style.scss',
    '~/assets/css/layout.scss',
    '~/assets/css/pageTrans.scss'
  ],
  head: {
    title: 'soussune',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'soussune' }
    ],
    link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ]
  },
  build: {
    vendor: [ 'luxon' ],
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
  },
  rss: {
    title: 'soussune - エンジニアわいわいポッドキャスト「そうっすね」',
    description: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。',
    feed_url: 'https://soussune.com/feed.xml',
    site_url: 'https://soussune.com/',
    image_url: 'https://soussune.com/images/itunes-artwork.jpg',
    webMaster: 'soussune.user@email.com (soussune)',
    managingEditor: 'soussune.user@email.com (soussune)',
    copyright: '2017 soussune',
    language: 'ja',
    pubDate: 'Thu, 01 Jun 2017 04:00:00 GMT',
    ttl: '60',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      'itunesu': 'http://www.itunesu.com/feed'
    },
    custom_elements: [
      { 'itunes:subtitle': 'エンジニアわいわいポッドキャスト「そうっすね」' },
      { 'itunes:author': 'そうっすね制作委員会' },
      { 'itunes:summary': 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。' },
      { 'itunes:keywords': 'soussune, tech, technology, keyboard, web, development, developer' },
      { 'itunes:owner': [
        { 'itunes:name': 'そうっすね制作委員会' },
        { 'itunes:email': 'soussune.user@gmail.com' }
      ]},
      { 'itunes:image': {
        _attr: {
          href: 'https://soussune.com/images/itunes-artwork.jpg'
        }
      }},
      { 'itunes:category': [
        {_attr: {
          text: 'Technology'
        }},
        { 'itunes:category': {
          _attr: {
            text: 'Tech News'
          }
        }},
        { 'itunes:category': {
          _attr: {
            text: 'Software How-To'
          }
        }}
      ]},
      { 'itunes:explicit': 'no' }
    ]
  },
  rssItems: episodes.episode,
  loading: { color: '#3B8070' }
}
