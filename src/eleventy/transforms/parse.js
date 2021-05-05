const {JSDOM} = require("@tbranyen/jsdom")
const slugify = require("slugify")

function minify(input) {
    return input.replace(/\s{2,}/g, "").replace(/\'/g, '"')
}

module.exports = function parse(value, outputPath) {
    if (outputPath.endsWith(".html")) {
        const DOM = new JSDOM(value, {
            // resources: "usable" // loads external scripts, nah thanks
        })

        const document = DOM.window.document
        const articleImages = [...document.querySelectorAll("main article img")]
        const articleHeadings = [...document.querySelectorAll("main article h2")]

        if (articleImages.length) {
            articleImages.forEach(image => {
                image.setAttribute("loading", "lazy")

                // If an image has a title it means that the user added a caption
                // so replace the image with a figure containing that image and a caption
                if (image.hasAttribute("title")) {
                    const figure = document.createElement("figure")
                    const figCaption = document.createElement("figcaption")

                    figCaption.innerHTML = image.getAttribute("title")

                    image.removeAttribute("title")

                    figure.appendChild(image.cloneNode(true))
                    figure.appendChild(figCaption)

                    image.replaceWith(figure)
                }
            })
        }

        if (articleHeadings.length) {
            // Loop each heading and add a little anchor and an ID to each one
            articleHeadings.forEach(heading => {
                const headingSlug = slugify(heading.textContent.toLowerCase())
                const headingID = !!heading.id ? heading.id : headingSlug
                const anchor = document.createElement("a")

                anchor.setAttribute("href", `#${headingID}`)
                anchor.setAttribute("title", `Permalink for ${heading.textContent.trim()}`)
                anchor.className = "fragment-anchor"
                anchor.innerHTML = minify(`
                    <span class="hidden"> permalink</span>
                    <svg fill="currentColor" aria-hidden="true" focusable="false" width="1em" height="1em">
                        <use href="/images/sprites.svg#svg--link"></use>
                    </svg>`)

                heading.setAttribute("id", headingID)
                heading.appendChild(anchor)
            })
        }

        return `<!DOCTYPE ${document.doctype.name}>` + document.documentElement.outerHTML
    }
    return value
}
