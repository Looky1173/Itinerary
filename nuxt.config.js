export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Itinerary',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            {
                src: '/js/counterAnalytics.js'
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/global.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/auth.js',
        '~/plugins/notifications.js',
        { src: '~/plugins/vue-good-table', ssr: false }
    ],

    env: {
        backendURL: process.env.BACKEND_URL || 'http://localhost:8081'
    },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/color-mode'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    loading: {
        color: 'white',
        height: '3px',
        throttle: 300
    }
}
