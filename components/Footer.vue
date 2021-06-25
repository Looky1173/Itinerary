<template>
    <div class="Footer">
            <ul>
                <li>About</li>
                <li>
                    <NuxtLink to="/about">About Itinerary</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/developers">For Developers</NuxtLink>
                </li>
            </ul>
            <ul>
                <li>Resources</li>
                <li>
                    <NuxtLink to="/faq">FAQ</NuxtLink>
                </li>
                <li>
                    <a href="https://github.com/Looky1173/Itinerary" rel="noopener noreferrer" target="_blank">GitHub</a>
                </li>
                <li>
                    <a href="https://scratch.mit.edu/users/SuperScratcher_1234/#comments" rel="noopener noreferrer" target="_blank">Feedback</a>
                </li>
            </ul>
            <ul>
                <li>Legal</li>
                <li>
                    <NuxtLink to="/terms">Terms of Use</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
                </li>
            </ul>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .Footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 10px;
        font-size: 12px;
    }

    ul {
        padding: 0 10vw;
    }

    ul li {
        text-decoration: none;
        list-style: none;
        padding: 3px 15px;
        color: inherit;
    }

    ul li:first-child {
        font-weight: 700;
        color: var(--secondary-color-very-dark);
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

    @media only screen and (max-width: 720px) {
        .Footer {
            flex-direction: column;
        }
        ul {
            padding: 0 1rem;
        }
    }
</style>