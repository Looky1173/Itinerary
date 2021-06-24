<template>
    <div class="Footer">
        <div class="footer-container">
            <div class="links">
                <dl>
                    <dt>About</dt>
                    <dd>
                        <NuxtLink to="/about">About Itinerary</NuxtLink>
                    </dd>
                    <dd>
                        <NuxtLink to="/developers">For Developers</NuxtLink>
                    </dd>
                </dl>
                <dl>
                    <dt>Resources</dt>
                    <dd>
                        <NuxtLink to="/faq">FAQ</NuxtLink>
                    </dd>
                    <dd>
                        <a href="https://github.com/Looky1173/Itinerary" rel="noopener noreferrer" target="_blank">GitHub</a>
                    </dd>
                    <dd>
                        <a href="https://scratch.mit.edu/users/SuperScratcher_1234/#comments" rel="noopener noreferrer" target="_blank">Feedback</a>
                    </dd>
                </dl>
                <dl>
                    <dt>Legal</dt>
                    <dd>
                        <NuxtLink to="/terms">Terms of Use</NuxtLink>
                    </dd>
                    <dd>
                        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .Footer {
        display: block;
        background-color: #f2f2f2;
        padding: 10px 0;
        color: var(--secondary-color-light);
        font-size: 0.85rem;
    }

    .footer-container {
        margin: 0 5vw;
    }

    .links {
        display: flex;
        text-align: center;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .links dl {
        display: inline-block;
        vertical-align: top;
        text-align: left;
        font-size: 1.25vw;
    }

    .links dt {
        display: block;
        font-weight: 600;
        color: var(--secondary-color-very-dark);
        margin-bottom: 8px;
    }

    .links dd a {
        font-weight: 400;
    }

    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: var(--primary-color-dark);
    }

    a:hover {
        color: var(--primary-color);
    }
</style>