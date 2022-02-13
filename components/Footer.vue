<template>
    <div class="Footer">
        <div class="links">
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
                    <a href="https://github.com/Looky1173/Itinerary" rel="noopener noreferrer" target="_blank">GitHub (Itinerary)</a>
                </li>
                <li>
                    <a href="https://github.com/Looky1173/Itinerary-Server" rel="noopener noreferrer" target="_blank">GitHub (Itinerary-Server)</a>
                </li>
                <li>
                    <a href="https://github.com/Looky1173/Itinerary-Contributors" rel="noopener noreferrer" target="_blank">GitHub (Itinerary-Contributors)</a>
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
        <div class="theme">
            <h4>Choose your theme</h4>
            <select class="themes" v-model="$colorMode.preference">
                <option v-for="(color, index) of colors" :key="color" :value="color">{{ themeNames[index] }}</option>
            </select>
        </div>
        <div class="disclaimer">
            <p>Itinerary is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation.</p>
            <p>Itinerary is an open source project, with styling aspects inspired by <b>Ocular</b> (by <b>@Jeffalo</b>) and the <b>Scratch website</b> (by the <b>Scratch Foundation</b>).</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                colors: ['system', 'light', 'dark', 'flame'],
                themeNames: ['System', 'Light mode', 'Dark mode', 'Flame']
            };
        }
    };
</script>

<style scoped>
    .Footer {
        background-color: var(--footer-background);
        padding: 10px 0;
        margin-top: 10px;
    }

    .links {
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
        font-weight: 600;
    }

    ul li:first-child {
        font-size: 14px;
        font-weight: 700;
        color: var(--footer-category-title);
    }

    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: var(--footer-category-item);
    }

    a:hover {
        color: var(--footer-category-item-hover);
    }

    @media only screen and (max-width: 720px) {
        .links {
            flex-direction: column;
        }
        ul {
            padding: 0 1rem;
        }
    }

    .disclaimer,
    .theme {
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
    }
</style>