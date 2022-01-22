<template>
    <div class="countdown">
        <div v-if="days" class="countdown-block">
            <div class="countdown-digit">{{ days | twoDigits }}</div>
            <div class="countdown-text">Days</div>
        </div>
        <div class="countdown-block">
            <div class="countdown-digit">{{ hours | twoDigits }}</div>
            <div class="countdown-text">Hours</div>
        </div>
        <div class="countdown-block">
            <div class="countdown-digit">{{ minutes | twoDigits }}</div>
            <div class="countdown-text">Minutes</div>
        </div>
        <div class="countdown-block">
            <div class="countdown-digit">{{ seconds | twoDigits }}</div>
            <div class="countdown-text">Seconds</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            date: null,
        },
        data() {
            return {
                now: Math.trunc(new Date().getTime() / 1000),
                event: this.date,
                finish: false,
            };
        },
        mounted() {
            const _self = this;
            window.setInterval(() => {
                this.now = Math.trunc(new Date().getTime() / 1000);
                if (!this.finish && this.calculatedDate - this.now <= 0) {
                    _self.finish = true;
                    _self.$emit('on-finish');
                }
            }, 1000);
        },
        computed: {
            secondCount() {
                return this.calculatedDate - this.now;
            },
            calculatedDate() {
                return Math.trunc(Date.parse(this.event) / 1000);
            },
            seconds() {
                if (this.secondCount < 0) return 0;
                return this.secondCount % 60;
            },
            minutes() {
                if (this.secondCount < 0) return 0;
                return Math.trunc(this.secondCount / 60) % 60;
            },
            hours() {
                if (this.secondCount < 0) return 0;
                return Math.trunc(this.secondCount / 60 / 60) % 24;
            },
            days() {
                if (this.secondCount < 0) return 0;
                return Math.trunc(this.secondCount / 60 / 60 / 24);
            },
        },
        filters: {
            twoDigits(value) {
                if (value.toString().length <= 1) {
                    return '0' + value.toString();
                }
                return value.toString();
            },
        },
        watch: {
            date: function (newDate) {
                this.event = newDate;
                this.finish = false;
            },
        },
    };
</script>
<style scoped>
    .countdown {
        display: flex;
    }
    .countdown-block {
        text-align: center;
        padding: 0px 15px;
        position: relative;
    }
    .countdown-block:first-child {
        padding-left: 0;
    }
    .countdown-block:first-child .countdown-digit:before {
        display: none;
    }
    .countdown-block:last-child {
        padding-right: 0;
    }
    .countdown-text {
        text-transform: uppercase;
        margin-bottom: 5px;
    }
    .countdown-digit {
        font-size: 300%;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 5px;
    }
    .countdown-digit:before {
        content: ':';
        position: absolute;
        left: -5px;
    }
</style>
