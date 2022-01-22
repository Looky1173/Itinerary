<template>
    <div ref="dropdown-self" class="dropdown-container">
        <ul class="dropdown-content">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    import { createPopper } from '@popperjs/core';
    export default {
        props: {
            reference: {
                type: String,
                required: true,
            },
            placement: {
                type: String,
                default: 'bottom-start',
            },
            options: {
                type: Object,
                default: null,
                required: false,
            },
        },
        mounted() {
            this.$nextTick(function () {
                var button = this.$parent.$refs[this.reference];
                var dropdown = this.$refs['dropdown-self'];

                console.log(button);
                console.log(dropdown);

                const popperInstance = createPopper(button, dropdown, {
                    placement: this.placement,
                    ...this.options,
                });

                function show() {
                    dropdown.setAttribute('data-show', '');
                    button.setAttribute('data-dropdown-open', '');
                    popperInstance.update();
                }

                function hide() {
                    dropdown.removeAttribute('data-show');
                    button.removeAttribute('data-dropdown-open');
                }

                document.addEventListener('click', function (e) {
                    const target = e.target;
                    if (target === dropdown) return;
                    if (button.contains(target)) {
                        e.preventDefault();
                        if (button.hasAttribute('data-dropdown-open')) {
                            hide();
                        } else {
                            show();
                        }
                    } else {
                        if (!target.classList.contains('disabled')) {
                            hide();
                        }
                    }
                });
            });
        },
    };
</script>

<style scoped>
    .dropdown-container {
        z-index: inherit;
        display: none;
    }

    .dropdown-container[data-show] {
        display: block;
    }

    .dropdown-content {
        border: 1px solid hsla(0, 0%, 0%, 0.15);
        background-color: var(--header-background);
        padding: 0;
        margin: 0;
        min-width: 186px;
        max-width: 260px;
        overflow: visible;
        box-shadow: 0 8px 8px 0 hsl(0deg 0% 0% / 15%);
        color: white;
    }

    .dropdown-item {
        display: block;
        line-height: 34px;
        white-space: nowrap;
        padding: 0 10px;
        font-size: 0.75rem;
        margin: 0;
        font-weight: bold;
        background-color: var(--header-background);
    }

    .dropdown-item.danger {
        background-color: var(--button-danger-background);
    }

    .rounded .dropdown-content {
        border-radius: 8px;
    }

    .rounded .dropdown-content .dropdown-item:first-child {
        border-radius: 8px 8px 0 0;
    }

    .rounded .dropdown-content .dropdown-item:last-child {
        border-radius: 0 0 8px 8px;
    }

    .rounded .dropdown-content .dropdown-item:only-child {
        border-radius: 8px;
    }

    .rounded-top .dropdown-content .dropdown-item:first-child,
    .rounded-top .dropdown-content {
        border-radius: 8px 8px 0 0;
    }

    .rounded-bottom .dropdown-content .dropdown-item:last-child,
    .rounded-bottom .dropdown-content {
        border-radius: 0 0 8px 8px;
    }

    .dropdown-item.hoverable:hover {
        filter: brightness(0.9);
    }

    .hoverable {
        cursor: pointer;
    }

    li.disabled {
        cursor: default;
        opacity: 0.5;
    }

    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: white;
    }

    .divider {
        width: 100%;
        height: 2px;
        background-color: hsla(0, 0%, 0%, 0.15);
    }
</style>