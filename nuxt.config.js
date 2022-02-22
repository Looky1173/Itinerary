export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head() {
        const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
        return {
            title: 'Itinerary',
            htmlAttrs: {
                ...i18nHead.htmlAttrs,
            },
            meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }, ...i18nHead.meta],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, ...i18nHead.link],
            script: [
                {
                    src: '/js/counterAnalytics.js',
                },
            ],
        };
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/css/global.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/auth.js', '~/plugins/notifications.js', { src: '~/plugins/vue-good-table', ssr: false }],

    env: {
        backendURL: process.env.BACKEND_URL || 'http://localhost:8081',
    },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['@nuxtjs/color-mode'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/markdownit', '@nuxtjs/i18n'],

    markdownit: {
        runtime: true, // Support `$md()`
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    loading: {
        color: 'white',
        height: '3px',
        throttle: 300,
    },

    i18n: {
        locales: [
            {
                code: 'en',
                iso: 'en-GB',
                file: 'en-GB.js',
                name: 'English',
            },
            {
                code: 'hu',
                iso: 'hu-HU',
                file: 'hu-HU.js',
                name: 'Magyar',
            },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
        baseUrl: 'https://itinerary.eu.org',
        vueI18n: { fallbackLocale: 'en' },
    },
};
