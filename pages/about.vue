<template>
    <div class="container">
        <Navigation />
        <div class="content">
            <div class="card">
                <h1>{{ $t('footer.aboutTheSite') }}</h1>
                <p v-html="$t('credits.websiteDescription')"></p>
            </div>
            <div class="card">
                <h1>{{ $t('credits.credits') }}</h1>
                <p v-html="$t('credits.acknowledgement')"></p>
                <br />
                <Contributors />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: 'About | Itinerary',
            };
        },
    };
</script>

<style scoped>
</style>