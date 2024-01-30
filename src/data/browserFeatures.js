export default [
  {
    "id": "css-container-queries",
    "language": "css",
    "supportsJS": "CSSContainerRule",
    "type": "at-rules",
    "key": "container",
    "title": "@container",
    "description": "Like media queries, but even better. Basically, allows us to write context-aware CSS by querying an element’s parent.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-contain-3)", "[Article by Stephanie Eckles](https://www.smashingmagazine.com/2021/05/complete-guide-css-container-queries/)"]
  },
  {
    "id": "css-has",
    "language": "css",
    "supports": "selector(div:has(span))",
    "type": "selectors",
    "key": "has",
    "title": ":has()",
    "description": "The fabled “parent selector”! This allows us to finally style an element based on its children.",
    "links": ["[Official Specification](https://www.w3.org/TR/selectors-4/)", "[Article by Bramus Van Damme](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/)"]
  },
  {
    "id": "css-nesting",
    "language": "css",
    "supports": "selector(& span)",
    "type": "properties",
    "key": "nesting",
    "title": "Nesting",
    "description": "This one is a huge part of what makes Sass/SCSS so appealing to developers. There will always be a value in pre-rendering some parts of our CSS, but I’m excited to see more features like this that will make life easier for developers all the way through from “beginner” to “expert”.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-nesting-1/)", "[Article by Killian Valkhof](https://kilianvalkhof.com/2021/css-html/css-nesting-specificity-and-you/)"]
  },
  {
    "id": "css-cascade-layers",
    "language": "css",
    "supportsJS": "CSSLayerBlockRule",
    "title": "Cascade Layers",
    "description": "Gives us tighter control on the reigns of the cascade. This adds a layer of complexity to specificity in our CSS but allows us to designate different parts of our CSS to different layers, much like the concept of stacking with `z-index`. This complexity actually makes the practise of overriding selector specificity, using `!important` (proactively!), and a number of other silly tricks we've added to our toolkit over the years.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-cascade-5/)", "[Article by Miriam Suzanne](https://css-tricks.com/css-cascade-layers)"]
  },
  {
    "id": "css-subgrid",
    "language": "css",
    "supports": "grid-template-columns: subgrid",
    "key": "grid-template-rows.subgrid",
    "title": "subgrid",
    "description": "Allows grid to cascade into children of a grid container, rather than the need for a flat layout.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-grid-2/)", "[Article by Rachel Andrew](https://www.smashingmagazine.com/2018/07/css-grid-2/)"]
  },
  {
    "id": "css-when-else",
    "language": "css",
    "title": "@when/@else",
    "description": "Similar to conditionals in other programming languages. Could be useful for making complex media queries more logical.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-conditional-5)", "[Article by Chris Coyier](https://css-tricks.com/proposal-for-css-when/)"]
  },
  {
    "id": "css-color-function",
    "language": "css",
    "supports": "color: color(sRGB 0 1 0)",
    "type": "types",
    "key": "color.color",
    "title": "color()",
    "description": "Specify a color in a different color space.",
    "links": ["[Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)", "[Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)", "[Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)"]
  },
  {
    "id": "oklch",
    "language": "css",
    "supports": "color: oklch(0 0 0)",
    "type": "types",
    "key": "color.oklch",
    "title": "oklch()",
    "description": "The `oklch()` functional notation expresses a given color in the OKLCH color space.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)"]
  },
  {
    "id": "oklab",
    "language": "css",
    "supports": "color: oklab(0 0 0)",
    "type": "types",
    "key": "color.oklab",
    "title": "oklab()",
    "description": "The `oklab()` functional notation expresses a given color in the OKLAB color space.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklab)"]
  },
  {
    "id": "css-lch-lab",
    "language": "css",
    "supports": "color: lch(0 0 0)",
    "type": "types",
    "key": "color.lab",
    "title": "lab()/lch()",
    "description": "Alternate, more-understandable color functions. `lab()` defines colors using *lightness* and *a* and *b* values which define the hue. `lch()` defines colors using *lightness*, *chroma*, and *hue*.",
    "links": ["[Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)", "[Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)", "[Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)"]
  },
  {
    "id": "hwb",
    "language": "css",
    "supports": "color: hwb(0 0% 0%)",
    "type": "types",
    "key": "color.hwb",
    "title": "hwb()",
    "description": "Define colors using *hue*, *whiteness*, and *blackness*.",
    "links": ["[Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)", "[Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)", "[Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)"]
  },
  {
    "id": "css-color-contrast",
    "language": "css",
    "supports": "color: color-contrast(black vs white, snow)",
    "type": "types",
    "key": "color.color-contrast",
    "title": "color-contrast()",
    "description": "Given one color, chooses from a list of other colors to output the one with the highest contrast.",
    "links": ["[Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)", "[Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)", "[Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)"]
  },
  {
    "id": "css-color-mix",
    "language": "css",
    "supports": "color: color-mix(in hsl, red, blue)",
    "type": "types",
    "key": "color.color-mix",
    "title": "color-mix()",
    "description": "Mixes two colors together.",
    "links": ["[Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)", "[Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)", "[Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)"]
  },
  {
    "id": "css-scroll-timeline",
    "language": "css",
    "supports": "scroll-timeline: none block",
    "type": "properties",
    "key": "scroll-timeline",
    "title": "@scroll-timeline",
    "description": "Native-CSS animations based on scroll position—no more need for JS!",
    "links": ["[Official Specification](https://drafts.csswg.org/scroll-animations-1/)", "[Article by Bramus Van Damme](https://css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines/)"]
  },
  {
    "id": "viewport-unit-variants",
    "language": "css",
    "supports": "height: 100dvb",
    "type": "properties",
    "key": "viewport_percentage_units_dynamic",
    "title": "Viewport Unit Variants",
    "description": "Small, large, and dynamic viewport units allow us clearer and more concise definitions for layout.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-values-4/#viewport-relative-lengths)", "[Article by Bramus Van Damme](https://www.bram.us/2021/07/08/the-large-small-and-dynamic-viewports/)"]
  },
  {
    "id": "css-focus-visible",
    "language": "css",
    "supports": "selector(:focus-visible)",
    "type": "selectors",
    "key": "focus-visible",
    "title": ":focus-visible",
    "description": "More discrete condition for focus styles.",
    "links": ["[Official Specification](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo)", "[Page on CSS-Tricks](https://css-tricks.com/almanac/selectors/f/focus-visible/)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)"]
  },
  {
    "id": "css-font-palette",
    "language": "css",
    "supports": "font-tech(palettes)",
    "type": "properties",
    "key": "font-palette",
    "title": "font-palette",
    "description": "Define a palette from a color font.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-fonts-4/#propdef-font-palette)"]
  },
  {
    "id": "array-at",
    "language": "javascript",
    "type": "buildins",
    "key": "Array.at",
    "title": "Array.prototype.at()",
    "description": "Like `indexOf()` but allows us to pass a negative integer, rather than hinging upon the array’s length.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)"]
  },
  {
    "id": "css3-attr",
    "language": "css",
    "supports": "width: attr(charlength ch, 60ch)",
    "title": "attr()",
    "description": "Expands the use of the `attr()` function by making it available to more properties and by allowing a <q>type or unit</q> to be passed alongside the targetted attribute. This could be used for things like passing a <q>url</q>-type attribute to `background-image`.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-values/#attr-notation)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/attr)"]
  },
  {
    "id": "css-math-functions",
    "language": "css",
    "supports": "width: clamp(1.438rem, 1rem + 1vw, 2rem)",
    "title": "Comparison Functions",
    "description": "Brings `min()`, `max()`, and `clamp()` to CSS.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-values-4/#comp-func)", "[clamp() calculator](https://chrisburnell.com/clamp-calculator/)"]
  },
  {
    "id": "stepped-value-funcs",
    "language": "css",
    "supports": "width: mod(16px, 5px)",
    "type": "types",
    "key": "round",
    "title": "Stepped Value Functions",
    "description": "Brings `round()`, `mod()`, and `rem()` to CSS.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-values-4/#round-func)"]
  },
  {
    "id": "trig-funcs",
    "language": "css",
    "supports": "width: calc(1px * sin(45deg))",
    "type": "types",
    "key": "sin",
    "title": "Trigonometry Functions",
    "description": "Brings `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`, and `atan2()` to CSS.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-values-4/#trig-funcs)"]
  },
  {
    "id": "exponent-funcs",
    "language": "css",
    "supports": "width: calc(2px * pow(2, 3))",
    "type": "types",
    "key": "pow",
    "title": "Exponential Functions",
    "description": "Brings `pow()`, `sqrt()`, `hypot()`, `log()`, and `exp()` to CSS.",
    "links": ["[Official Specification](https://w3c.github.io/csswg-drafts/css-values/#exponent-funcs)"]
  },
  {
    "id": "sign-funcs",
    "language": "css",
    "supports": "width: abs(100% - 16px)",
    "type": "types",
    "key": "abs",
    "title": "Sign-Related Functions",
    "description": "Brings `abs()` and `sign()` to CSS.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-values-4/#sign-funcs)"]
  },
  {
    "id": "calc-constants",
    "language": "css",
    "supports": "transform: scale(min(pi, 5, e))",
    "type": "types",
    "key": "calc-constant.pi",
    "title": "Numeric Constants",
    "description": "Brings the numeric constants `e` and `pi` to CSS.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-values-4/#calc-constants)"]
  },
  {
    "id": "css-matches-pseudo",
    "language": "css",
    "supports": "selector(:is(span))",
    "title": ":is()",
    "description": "Takes a list of selectors as its argument and targets any matching selector in the list. I find it useful for grouping headings, types of elements, and even interaction-based pseudo-classes for anchors, buttons, and the like.",
    "links": ["[Official Specification](https://www.w3.org/TR/selectors4/#matches)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)"]
  },
  {
    "id": "css-logical-props",
    "language": "css",
    "supports": "inline-size: 100%",
    "title": "Logical Properties",
    "description": "Properties used to define size-based values, what we’re used as being `width`, `height`, `margin-left`, and so on, but in such a way that works hand-in-hand with `writing-mode` without the need to redefine the “top” or “bottom” of an element to do so.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-logical-1/)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts)"]
  },
  {
    "id": "colr-v1",
    "language": "css",
    "supports": "font-tech(color-COLRv1)",
    "title": "Colrv1 Font Formats",
    "description": "A font format with additional graphic capabilities: different colours, gradients, and blend modes to name a few.",
    "links": ["[Official Specification](https://docs.microsoft.com/en-us/typography/opentype/spec/colr)"]
  },
  {
    "id": "relative-colors",
    "language": "css",
    "supports": "color: rgb(from blue r g b / 80%)",
    "title": "Relative Colors",
    "description": "Gives us the ability to generate colours from other colours, with the ability to destructure the colour channels and manipulate them on the way.",
    "links": ["[Official Specification](https://www.w3.org/TR/css-color-5/#relative-colors)"]
  },
  {
    "id": "inert",
    "language": "html",
    "type": "global_attributes",
    "key": "inert",
    "title": "inert Attribute",
    "description": "An HTML attribute that allows you designate parts of your document as inactive, disallowing any interaction (mouse/keyboard/otherwise) within those elements.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert)"]
  },
  {
    "id": "at-rules",
    "language": "css",
    "supports": "at-rule(@property)",
    "type": "at-rules",
    "key": "property",
    "title": "@property",
    "description": "Gives us the ability to explicitly define our CSS custom properties, including type-checking, default values, and ability to cascade the value.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)"]
  },
  {
    "id": "target-text",
    "language": "css",
    "supports": "selector(::target-text)",
    "type": "selectors",
    "key": "target-text",
    "title": "::target-text",
    "description": "Represents the text that has been scrolled to if the browser supports scroll-to-text fragments, and allows styling similarly to `::selection`.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::target-text)"]
  },
  {
    "id": "web-share",
    "language": "html",
    "type": "manifest",
    "key": "share_target",
    "title": "Web Share API",
    "description": "“A way to allow websites to invoke the native sharing capabilities of the host platform”",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)"]
  },
  {
    "id": "margin-trim",
    "language": "css",
    "supports": "margin-trim: block",
    "type": "properties",
    "key": "margin-trim",
    "title": "margin-trim",
    "description": "Allows a container to trim the margins of its children’s adjoining edges.",
    "links": ["[Working Draft](https://www.w3.org/TR/css-box-4/#margin-trim)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim)"]
  },
  {
    "id": "css-variables",
    "language": "css",
    "supports": "--var: red",
    "type": "properties",
    "key": "custom-property",
    "title": "CSS Variables",
    "description": "Allows a declaring of native, cascading variables in CSS.",
    "links": ["[MDN Web Docs - Using CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)"]
  },
  {
    "id": "text-wrap",
    "language": "css",
    "supports": "text-wrap: balance",
    "type": "properties",
    "key": "text-wrap",
    "title": "text-wrap",
    "description": "Evenly distributes words across multiple lines to prevent widows.",
    "links": ["[Working Draft](https://www.w3.org/TR/css-text-4/#text-wrapping)", "[Article by Richard Rutter](https://clagnut.com/blog/2424/)"]
  },
  {
    "id": "intrinsic-width",
    "language": "css",
    "supports": "width: fit-content",
    "title": "Intrinsic & Extrinsic Sizing",
    "description": "Allows defining size using intrinsic values: `max-content`, `min-content`, `fit-content`, and `stretch`.",
    "links": ["[Working Draft](https://www.w3.org/TR/css-sizing-3/#sizing-values)"]
  },
  {
    "id": "easing-function",
    "language": "css",
    "supports": "transition-timing-function: linear(1, -0.5, 0)",
    "type": "types",
    "key": "easing-function",
    "title": "linear()",
    "description": "Allows defining more complex mathematical functions to describe the rate of change for numerical value changes.",
    "links": ["[Working Draft](https://drafts.csswg.org/css-images-4/#linear-gradients)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)"]
  },
  {
    "id": "popover",
    "language": "html",
    "type": "global_attributes",
    "key": "popover",
    "title": "popover Attribute",
    "description": "An HTML attribute to get and set the popover state of an element via JavaScript.",
    "links": ["[Working Draft](https://html.spec.whatwg.org/multipage/popover.html#dom-popover)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/popover)", "[Article by Hidde de Vries](https://hidde.blog/popover-semantics/)"]
  },
  {
    "id": "dialog",
    "language": "html",
    "title": "&lt;dialog&gt;",
    "description": "An HTML element to create a custom dialog box much like a modal window and includes a backdrop pseudo element.",
    "links": ["[Official Specification](https://html.spec.whatwg.org/multipage/forms.html#the-dialog-element)", "[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)", "[Article by Hidde de Vries](https://hidde.blog/popover-semantics/)"]
  },
  {
    "id": "accent-color",
    "language": "css",
    "supports": "accent-color: rebeccapurple",
    "type": "properties",
    "key": "accent-color",
    "title": "accent-color",
    "description": "Allows defining the accent color used for UI controls generated by some elements (forms, media, etc.).",
    "links": ["[Page on MDN](https://developer.mozilla.org/docs/Web/CSS/accent-color)"]
  },
  {
    "id": "view-transition",
    "language": "css",
    "supports": "view-transition-name: wibble",
    "type": "selectors",
    "key": "view-transition",
    "title": "View Transition API",
    "description": "Allows defining visual transitions which react to state changes, e.g. navigating between pages.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition)", "[Article by Dave Rupert](https://daverupert.com/2023/05/getting-started-view-transitions/)"]
  },
  {
    "id": "css-media-range-syntax",
    "language": "css",
    "title": "Media Queries Range Syntax",
    "description": "Adds syntax improvements to media queries to better describe ranges and comparison operators.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)"]
  },
  {
    "id": "style-scoped",
    "language": "css",
    "title": "@scope",
    "description": "Allows for CSS rules to be scoped to part of the DOM based on the position of the subject to be styled.",
    "links": ["[Working Draft](https://drafts.csswg.org/css-cascade-6/#scope-atrule)"]
  },
  {
    "id": "is",
    "language": "html",
    "type": "global_attributes",
    "key": "is",
    "title": "is Attribute",
    "description": "An HTML attribute to allow specifying a standard HTML element to behave like a custom element.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is)"]
  },
  {
    "id": "mdn-css_properties_animation-timeline",
    "language": "css",
    "supports": "animation-timeline: scroll(nearest block)",
    "type": "properties",
    "key": "animation-timeline",
    "title": "animation-timeline",
    "description": "Allows specifying a timeline to control the progress of a CSS animation.",
    "links": ["[Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)"]
  }
]
