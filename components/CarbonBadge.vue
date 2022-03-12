<template>
    <div class="carbon-badge">
        <div class="co2">
            <span :class="loading && 'loading'" v-html="statusMessage"></span>
            <div :class="{ website: true, error: error }"><a target="_blank" rel="noopener" href="https://websitecarbon.com">Website Carbon</a></div>
        </div>
        <div class="test-result" v-html="testResult"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                error: false,
                statusMessage: '',
                testResult: '',
                routePath: null,
            };
        },
        methods: {
            fetchData() {
                this.loading = true;
                this.error = false;
                this.statusMessage = 'Measuring CO<sub>2</sub>...';
                this.testResult = '';
                // Run the API request because there is no cached result available
                fetch('https://api.websitecarbon.com/b?url=' + this.routePath)
                    .then(function (r) {
                        if (!r.ok) {
                            throw Error(r);
                        }
                        return r.json();
                    })

                    .then((r) => {
                        this.loading = false;
                        this.renderResult(r);

                        // Save the result into localStorage with a timestamp
                        r.t = new Date().getTime();
                        localStorage.setItem('website-carbon_' + this.routePath, JSON.stringify(r));
                    })

                    // Handle error responses
                    .catch((e) => {
                        this.loading = false;
                        this.error = true;
                        this.statusMessage = 'No result';
                        this.testResult = '<b>Note:</b> Statistics on error pages are not available';
                        localStorage.removeItem('website-carbon_' + this.routePath);
                        console.log(e);
                    });
            },
            renderResult(r) {
                this.statusMessage = r.c + 'g of CO<sub>2</sub>/view';
                this.testResult = 'Cleaner than ' + r.p + '% of pages tested';
            },
            initialize() {
                this.routePath = window.location.href;
                // Get result if it's saved
                let cachedResponse = localStorage.getItem('website-carbon_' + this.routePath);
                const t = new Date().getTime();

                // If there is a cached response, use it
                if (cachedResponse) {
                    const r = JSON.parse(cachedResponse);
                    this.renderResult(r);

                    // If time since response was cached is over a day, then make a new request and update the cached result
                    if (t - r.t > 86400000) {
                        this.fetchData();
                    }

                    // If no cached response, then fetch from API
                } else {
                    this.fetchData();
                }
            },
        },
        mounted() {
            this.initialize();
        },
    };
</script>

<style scoped>
    .carbon-badge {
        font-size: 0.875rem;
        text-align: center;
        color: var(--text);
        height: 5rem;
    }

    .co2 {
        border-radius: 5px;
        background: var(--background);
        border-right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        overflow: hidden;
    }

    .co2 span {
        padding: 0 1rem;
        font-weight: 600;
        min-width: 12rem;
    }

    .website {
        background-color: var(--header-background);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 1s linear;
    }

    .website a {
        color: white;
        padding: 0 1rem;
        transition: color 1s linear;
    }

    .website.error {
        background-color: var(--text);
    }

    .dark-mode .website.error {
        background-color: var(--text-muted);
    }

    .dark-mode .website.error a {
        color: var(--footer-background);
    }

    .test-result {
        padding: 0.5rem 0;
    }

    .loading {
        animation: 1.5s linear infinite loading-animation;
    }

    @keyframes loading-animation {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            opacity: 1;
        }
    }
</style>