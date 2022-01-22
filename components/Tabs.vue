<template>
    <div>
        <ul class="tabs-header">
            <li v-for="(tab, index) in tabs" :key="tab.title" @click="selectTab(index)" :class="index == selectedIndex ? 'tab-selected' : ''">
                <span v-html="tab.title"></span>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedIndex: 0, // the index of the selected tab,
                tabs: [] // all of the tabs
            };
        },
        created() {
            this.tabs = this.$children;
        },
        mounted() {
            this.selectTab(0);
        },
        methods: {
            selectTab(i) {
                this.selectedIndex = i;

                // loop over all the tabs
                this.tabs.forEach((tab, index) => {
                    tab.isActive = index === i;
                });
            }
        }
    };
</script>

<style scoped>
    ul.tabs-header {
        display: flex;
        list-style: none;
        margin: 10px 0;
        padding: 0;
        width: 100%;
    }
    ul.tabs-header > li {
        padding: 10px 20px;
        border-radius: 8px;
        margin: 0;
        display: inline-block;
        margin-right: 5px;
        cursor: pointer;
    }
    ul.tabs-header > li span {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul.tabs-header > li.tab-selected {
        font-weight: bold;
        border-radius: 8px 8px 0 0;
        box-shadow: inset 0 -5px 0 var(--tabs-selected-underline);
    }
    li {
        background-color: var(--tabs-background);
        color: var(--text-muted);
    }
    li.tab-selected {
        background-color: var(--tabs-selected-background);
        color: var(--text);
    }
    .stretch .tabs-header > li {
        width: 100%;
    }
</style>