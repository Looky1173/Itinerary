<template>
    <div class="container">
        <Navigation />
        <Modal :isOpen="!hideCatsModal" :hideSubHeader="true" @close="hideCatsModal = true">
            <template #header>Meow purrrr lick meow! 😺</template>
            <template>
                <div id="random-cat">
                    <span>{{ selectedQuote }}</span>
                    <img :src="selectedImage" alt="Picture of random cat." />
                </div>
            </template>
            <template #actions>
                <button @click="hideCatsModal = true" class="btn">Paw-don me</button>
                <button @click="getCatImageAndQuote(images, quotes)" class="btn btn-primary" style="margin-left: 10px">Can I paw-lease see another one?</button>
            </template>
        </Modal>
        <div class="content">
            <div class="card">
                <div id="error-container">
                    <h1 id="error-code">{{ error.statusCode }}</h1>
                    <div id="error-explanation">
                        <h2>{{ error.message }}</h2>
                        <br />
                        <div>
                            <p>Here are some things you can do:</p>
                            <ul>
                                <li><a href="https://github.com/Looky1173/Itinerary/issues">Create a new issue suggesting it</a></li>
                                <li><NuxtLink to="/">Return to the home page</NuxtLink></li>
                                <li><a href="https://findtheinvisiblecow.com/">Find the invisible cow</a></li>
                                <li>
                                    <a
                                        @click="
                                            hideCatsModal = false;
                                            getCatImageAndQuote(images, quotes);
                                        "
                                        href="#"
                                        >😺 Browse some cats</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        props: ['error'],
        layout: 'error',
        data() {
            return {
                hideCatsModal: true,
                images: [
                    '/img/cats/1.jpg',
                    '/img/cats/2.jpg',
                    '/img/cats/3.jpg',
                    '/img/cats/4.jpg',
                    '/img/cats/5.jpg',
                    '/img/cats/6.jpg',
                    '/img/cats/7.jpg',
                    '/img/cats/8.jpg',
                    '/img/cats/9.jpg',
                    '/img/cats/10.png',
                    '/img/cats/11.jpg',
                    '/img/cats/12.jpg',
                    '/img/cats/13.jpg',
                    '/img/cats/14.png',
                    '/img/cats/15.png',
                    '/img/cats/16.png',
                    '/img/cats/17.png',
                    '/img/cats/18.png',
                    '/img/cats/19.jpg',
                    '/img/cats/20.jpg',
                    '/img/cats/21.jpg',
                    '/img/cats/22.jpg',
                    '/img/cats/23.jpg',
                    '/img/cats/24.jpg',
                    '/img/cats/25.jpg',
                    '/img/cats/26.jpg',
                    '/img/cats/27.jpg',
                    '/img/cats/28.jpg',
                    '/img/cats/29.jpg',
                    '/img/cats/30.gif',
                    '/img/cats/31.jpg',
                    '/img/cats/32.jpg',
                    '/img/cats/33.jpg',
                    '/img/cats/34.jpg',
                    '/img/cats/35.jpg',
                    '/img/cats/36.jpg',
                    '/img/cats/37.jpg',
                    '/img/cats/38.jpg',
                    '/img/cats/39.jpg',
                    '/img/cats/40.jpg',
                    '/img/cats/41.jpg',
                    '/img/cats/42.jpg',
                    '/img/cats/43.jpg',
                    '/img/cats/44.jpg',
                    '/img/cats/45.jpg',
                    '/img/cats/46.jpg',
                    '/img/cats/47.jpg',
                    '/img/cats/48.jpg',
                ],
                quotes: [
                    'I became a pet after retiring from NASA.',
                    'I was cursed to take this form by an evil wizard.',
                    'My alter ego is Katy Purry.',
                    "You should feed me now or I'll be late to my bowling league.",
                    'You think you know, but you have no idea. This is the diary of Scratch Cat...',
                    "I'm a criminal paw-secutor.",
                    'By night, I put on a human costume and fight crime.',
                    'My grandma was the inspiration for Warrior Cats.',
                    "You think I'm running back and forth for no reason, but I've got a marathon in June I'm training for.",
                    'Can you please put on the movie Ratatouille?',
                    "In my secret lab I've almost perfected prosthetic opposable thumbs.",
                    "I'm late for my audition for Cats: The Musical.",
                    "Actually I'm a famous opera meower.",
                    'My purrs are ancient healing magic.',
                    'I purr because I contain a small motor.',
                    "I'm not trying to stab you with my claws, I'm practicing to be on The Great British Bakeoff.",
                    'My name is Alexander Hameowlton.',
                    'When my humans go to school, I host tea parties with the neighborhood pets.',
                    "When I scratch at the furniture it's my way of telling you it's time for a new couch",
                    'I knock things off the table, because things on the table are my mortal enemies.',
                    'When I sleep, I dream about three things: fish, catnip, and you. But mostly fish.',
                    'This is my angry face.',
                    "I'm a cat during the day, but I'm a loaf ... also during the day.",
                    'At night I closely study the word "homeowner" because the word "meow" is in it.',
                    'My journal is filled with so many cat puns, I almost cat believe it.',
                    "I'm gonna change the world super soon, quick 3-hour power nap first.",
                    'If Scratch code happened in real life, "Move 10" would make me just sit there and look at you',
                    'I theorized the existence of radium and then was so disappointed to out that Marie Curie had beat me to it in 1902!',
                    'In my free time, I like to go bird watching.',
                    'Hannah Meowtana was inspired by my life.',
                ],
                image: null,
                selectedImage: null,
                quote: null,
                selectedQuote: null,
            };
        },
        methods: {
            getCatImageAndQuote(images, quotes) {
                do {
                    this.image = images[Math.floor(Math.random() * images.length)];
                } while (this.image === this.selectedImage);
                do {
                    this.quote = quotes[Math.floor(Math.random() * quotes.length)];
                } while (this.quote === this.selectedQuote);

                this.selectedImage = this.image;
                this.selectedQuote = this.quote;
            },
        },
        mounted() {
            this.getCatImageAndQuote(this.images, this.quotes);
        },
    };
</script>

<style scoped>
    #error-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    #error-explanation h2 {
        font-size: 1.5rem;
    }

    #error-explanation > div {
        font-size: 1rem;
    }

    #error-code {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: var(--header-background);
        color: white;
        border-radius: 10px;
        margin: 0;
        padding: 1rem;
        width: fit-content;
        font-size: 5rem;
    }

    @media (min-width: 800px) {
        #error-code {
            justify-content: center;
            padding: 0;
            width: auto;
            font-size: 10rem;
        }

        #error-explanation h2 {
            font-size: 2rem;
        }

        #error-explanation > div {
            font-size: 1.2rem;
        }
    }

    @media (min-width: 1100px) {
        #error-code {
            font-size: 12.5rem;
        }
    }

    #random-cat {
        height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #random-cat img {
        max-width: 100%;
        max-height: 50vh;
    }

    #random-cat span {
        font-size: 1.3rem;
        margin: 0 2rem 1rem 2rem;
        text-align: center;
    }

    @media only screen and (max-width: 479px), only screen and (max-height: 479px) {
        #random-cat {
            height: 85vh;
        }

        #random-cat span {
            font-size: 1.1rem;
        }
    }
</style>