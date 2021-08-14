<template>
    <div class="contributor">
        <a :href="contributor.profile">
            <div class="contributor-avatar">
                <img :src="contributor.avatar_url" class="contributor-icon" />
            </div>
            <div class="contributor-info">
                <p class="contributor-name" style="text-align: left">
                    {{ contributor.name }}
                </p>
                <div class="contributor-items">
                    <div v-for="(name, key) of contributor.contributions" :title="icons[name].description" :key="key">
                        {{ icons[name].symbol }}
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                icons: {
                    a11y: {
                        symbol: '\ufe0f\ufe0f\ufe0f\ufe0f\u267f\ufe0f',
                        description: 'Accessibility'
                    },
                    audio: {
                        symbol: '\ud83d\udd0a',
                        description: 'Audio'
                    },
                    blog: {
                        symbol: '\ud83d\udcdd',
                        description: 'Blogposts'
                    },
                    bug: {
                        symbol: '\ud83d\udc1b',
                        description: 'Bug reports'
                    },
                    business: {
                        symbol: '\ud83d\udcbc',
                        description: 'Business development'
                    },
                    code: {
                        symbol: '\ud83d\udcbb',
                        description: 'Code'
                    },
                    content: {
                        symbol: '\ud83d\udd8b',
                        description: 'Content'
                    },
                    data: {
                        symbol: '\ud83d\udd23',
                        description: 'Data'
                    },
                    design: {
                        symbol: '\ud83c\udfa8',
                        description: 'Design'
                    },
                    doc: {
                        symbol: '\ud83d\udcd6',
                        description: 'Documentation'
                    },
                    eventOrganizing: {
                        symbol: '\ud83d\udccb',
                        description: 'Event Organizing'
                    },
                    example: {
                        symbol: '\ud83d\udca1',
                        description: 'Examples'
                    },
                    financial: {
                        symbol: '\ud83d\udcb5',
                        description: 'Financial'
                    },
                    fundingFinding: {
                        symbol: '\ud83d\udd0d',
                        description: 'Funding Finding'
                    },
                    ideas: {
                        symbol: '\ud83e\udd14',
                        description: 'Ideas, Planning, & Feedback'
                    },
                    infra: {
                        symbol: '\ud83d\ude87',
                        description: 'Infrastructure (Hosting, Build-Tools, etc)'
                    },
                    maintenance: {
                        symbol: '\ud83d\udea7',
                        description: 'Maintenance'
                    },
                    mentoring: {
                        symbol: '\ud83e\uddd1\u200d\ud83c\udfeb',
                        description: 'Mentoring'
                    },
                    platform: {
                        symbol: '\ud83d\udce6',
                        description: 'Packaging/porting to new platform'
                    },
                    plugin: {
                        symbol: '\ud83d\udd0c',
                        description: 'Plugin/utility libraries'
                    },
                    projectManagement: {
                        symbol: '\ud83d\udcc6',
                        description: 'Project Management'
                    },
                    question: {
                        symbol: '\ud83d\udcac',
                        description: 'Answering Questions'
                    },
                    review: {
                        symbol: '\ud83d\udc40',
                        description: 'Reviewed Pull Requests'
                    },
                    security: {
                        symbol: '\ud83d\udee1\ufe0f',
                        description: 'Security'
                    },
                    talk: {
                        symbol: '\ud83d\udce2',
                        description: 'Talks'
                    },
                    test: {
                        symbol: '\u26a0\ufe0f',
                        description: 'Tests'
                    },
                    tool: {
                        symbol: '\ud83d\udd27',
                        description: 'Tools'
                    },
                    translation: {
                        symbol: '\ud83c\udf0d',
                        description: 'Translation'
                    },
                    tutorial: {
                        symbol: '\u2705',
                        description: 'Tutorials'
                    },
                    userTesting: {
                        symbol: '\ud83d\udcd3',
                        description: 'User Testing'
                    },
                    video: {
                        symbol: '\ud83d\udcf9',
                        description: 'Videos'
                    }
                }
            };
        },
        props: ['contributor']
    };
</script>

<style scoped>
    .contributor {
        width: 100%;
        border-radius: 10px;
        background-color: var(--card-dark-background);
        transition: 0.5s ease-in-out;
    }
    
    .contributor a {
        padding: 0.375rem 15px;
        color: inherit;
        display: flex;
        text-decoration: none;
    }

    .contributor-avatar {
        border-radius: 10px;
        background-color: white;
        width: 64px;
        height: 64px;
        margin-right: 0.75rem;
    }

    .contributor-avatar img {
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }

    .contributor-info {
        display: flex;
        flex: 1 0 0;
        max-width: 100%;
        flex-direction: column;
        justify-content: center;
    }

    .contributor-name {
        font-size: 1.25rem;
        line-height: 1;
        word-break: break-all;
        margin: 0;
    }

    .contributor-items {
        display: flex;
    }
    
    .contributor:hover {
        transform: scale(1.1);
        opacity: 0.8;
    }
</style>