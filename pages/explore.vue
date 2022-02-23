<template>
    <div class="container">
        <Navigation />
        <Banner>
            <h1>{{ $t('navigation.explore') }}</h1>

            <template #subnav>
                <div style="color: white; font-size: 600; margin: 1rem 0">
                    <b>Filters coming soon...</b>
                </div>
            </template>
        </Banner>
        <div class="content">
            <div class="card">
                <div class="header">
                    <h2>{{ $t('explore.exploreGameJams') }}</h2>
                    <div class="select-container sideways">
                        <h4>{{ $t('explore.gameJamsPerPage') }}</h4>
                        <select class="small" v-model="limit" @change="changedLimit()">
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <Pagination :page="currentPage" :totalPages="totalPages" auto="true" @previous="previousPage()" @next="nextPage()" />
                <Loading v-if="loadingJams" :message="$t('loaders.loadingGameJams')" />
                <div v-if="!loadingJams" class="jams">
                    <GameJam v-for="jam in jams" :key="jam.slug" :data="jam" class="explore-jam" />
                </div>
                <Pagination :page="currentPage" :totalPages="totalPages" auto="true" @previous="previousPage()" @next="nextPage()" />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loadingJams: true,
                jams: null,
                totalJams: null,
                jamsToDisplay: null,
                limit: this.$route.query.limit && !isNaN(this.$route.query.limit) ? this.$route.query.limit : 10,
                totalPages: null,
                currentPage: this.$route.query.page && !isNaN(this.$route.query.page) ? this.$route.query.page : 1,
            };
        },
        methods: {
            async fetchJams(page) {
                let offset = (page - 1) * this.limit;

                this.loadingJams = true;

                let response = await fetch(`${process.env.backendURL}/api/jams?limit=${this.limit}&offset=${offset}`, {
                    method: 'GET',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();

                this.jams = response.jams;
                this.totalJams = response.total;
                if (this.totalJams) this.totalPages = Math.ceil(this.totalJams / this.limit);

                this.loadingJams = false;
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updateQueryParams();
                    this.fetchJams(this.currentPage);
                }
            },
            nextPage() {
                if (this.currentPage != this.totalPages) {
                    this.currentPage++;
                    this.updateQueryParams();
                    this.fetchJams(this.currentPage);
                }
            },
            changedLimit() {
                this.updateQueryParams();
                this.fetchJams(this.currentPage);
            },
            updateQueryParams() {
                this.$router.push({ path: this.$route.path, query: { page: this.currentPage, limit: this.limit } });
            },
        },
        mounted() {
            this.fetchJams(this.currentPage);
        },
    };
</script>

<style scoped>
    .jams {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        grid-auto-rows: auto;
        gap: 10px;
    }

    @media only screen and (min-width: 720px) {
        .jams {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }
    }

    .explore-jam {
        margin: 10px 0;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    @media only screen and (max-width: 720px) {
        .header {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>
