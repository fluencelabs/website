import '../scss/styles.scss'; // strange thing huh?
import { tns } from './vendor/slider/tiny-slider.module.js';

((w, d) => {
    const app = {};

    app.polyfill = {
        capitalize: (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        isSupport: (str) => {
            const h1 = document.createElement('h1');
            return !(!(`webkit${app.polyfill.capitalize(str)}` in h1.style) && !(str in h1.style));
        },

        init: () => {
            const els = Array.prototype.slice.call(d.querySelectorAll('.__polyfill'));

            if (els.length) {
                els.map(item => {
                    const supports = item.getAttribute('data-supports');


                    if (!app.polyfill.isSupport(supports)) {
                        item.classList.add('polyfill-fallback');
                    }
                })
            }
        }
    }

    app.menu = {
        init: () => {
            const clicker = Array.prototype.slice.call(d.querySelectorAll('.__menuopen'));
            const menu = d.querySelector('.__menu');
            const modificator = 'top-menu__show';

            if (clicker.length && menu) {
                clicker
                    .map(item => {
                        item.addEventListener('click', (e) => {
                            e.preventDefault();

                            menu.classList.contains(modificator) ?
                                menu.classList.remove(modificator) :
                                menu.classList.add(modificator)
                            ;
                        }, false)
                    })
            }
        }
    }

    app.slider = {
        props: {
            slider: null
        },

        init: () => {
            const slider_container = d.querySelector('.__slider');
            const slider_nav = d.querySelector('.__slider-nav');

            if (slider_container && slider_nav) {
                app.slider.props.slider = tns({
                    container: slider_container,
                    items: 3,
                    slideBy: 1,
                    autoplay: false,
                    loop: false,
                    nav: false,
                    gutter: 32,
                    controlsContainer: slider_nav,
                    responsive: {
                        320: {
                            items: 1,
                            gutter: 20,
                            fixedWidth: 265
                        },
                        650: {
                            gutter: 30
                        },
                        1200: {
                            items: 3,
                            fixedWidth: 350
                        }
                    }
                });
            }
        }
    }

    for (const m in app) {
        app[m].init();
    }
})(window, document);