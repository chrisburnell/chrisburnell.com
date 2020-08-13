const jsdom = require('@tbranyen/jsdom');
const {JSDOM} = jsdom;
const minify = require('../transforms/minify.js');
const slugify = require('slugify');

module.exports = function parse(value, outputPath) {
    if (outputPath.endsWith('.html')) {
        const DOM = new JSDOM(value, {
            // resources: 'usable'
        });

        const document = DOM.window.document;
        const articleImages = [...document.querySelectorAll('main article img')];
        const articleHeadings = [...document.querySelectorAll('main article h2')];
        const articleEmbeds = [...document.querySelectorAll('main article iframe')];

        if (articleImages.length) {
            articleImages.forEach(image => {
                image.setAttribute('loading', 'lazy');

                // If an image has a title it means that the user added a caption
                // so replace the image with a figure containing that image and a caption
                if (image.hasAttribute('title')) {
                    const figure = document.createElement('figure');
                    const figCaption = document.createElement('figcaption');

                    figCaption.innerHTML = image.getAttribute('title');

                    image.removeAttribute('title');

                    figure.appendChild(image.cloneNode(true));
                    figure.appendChild(figCaption);

                    image.replaceWith(figure);
                }
            });
        }

        if (articleHeadings.length) {
            // Loop each heading and add a little anchor and an ID to each one
            articleHeadings.forEach(heading => {
                const headingSlug = slugify(heading.textContent.toLowerCase());
                const headingID = !!heading.id ? heading.id : headingSlug;
                const anchor = document.createElement('a');

                anchor.setAttribute('href', `#${headingID}`);
                anchor.classList.add('fragment-anchor');
                anchor.innerHTML = minify(`
                    <span class="hidden"> permalink</span>
                    <svg fill="currentColor" aria-hidden="true" focusable="false" width="1em" height="1em">
                        <use xlink:href="/images/sprites.svg#svg--link"></use>
                    </svg>`);

                heading.setAttribute('id', headingID);
                heading.appendChild(anchor);
            });
        }

        // Look for videos and wrap them in a container element
        if (articleEmbeds.length) {
            articleEmbeds.forEach(embed => {
                if (embed.hasAttribute('allowfullscreen')) {
                    const player = document.createElement('div');
                    player.classList.add('media');

                    if (embed.getAttribute('src').includes('youtube.com')) {
                        player.classList.add('media--youtube');
                    }
                    else if (embed.getAttribute('src').includes('vimeo.com')) {
                        player.classList.add('media--vimeo');
                    }

                    if (embed.hasAttribute('title')) {
                        const figure = document.createElement('figure');

                        const figCaption = document.createElement('figcaption');
                        figCaption.innerHTML = embed.getAttribute('title');
                        embed.removeAttribute('title');

                        player.appendChild(embed.cloneNode(true));
                        figure.appendChild(player);

                        figure.appendChild(figCaption);

                        embed.replaceWith(figure);
                    }
                    else {
                        player.appendChild(embed.cloneNode(true));

                        embed.replaceWith(player);
                    }
                }
            });
        }

        return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
    }
    return value;
};
