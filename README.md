# chrisburnell.com


The source code for [chrisburnell.com](https://chrisburnell.com/) 👌

![Version](https://img.shields.io/badge/version-2.8.0-blue.svg?style=flat-square)[![GitHub license](https://img.shields.io/badge/license-GNU GPLv3-blue.svg?style=flat-square)](LICENSE)

[![Build Status](https://img.shields.io/travis/chrisburnell/chrisburnell.github.io/master.svg?style=flat-square)](https://travis-ci.org/chrisburnell/chrisburnell.github.io)![Dependencies](https://img.shields.io/david/chrisburnell/chrisburnell.github.io.svg?maxAge=2592000&style=flat-square)


## Table of Contents

- [Title](#chrisburnellcom)
- [Description](#description)
- [Contributing](#contributing)
- [Build Process](#build-process)
- [Layouts](#layouts)
- [Includes](#includes)
- [Sass Structure](#sass-structure)
- [Generated](#generated)
- [Network](#network)
- [License](#license)


## Description

My website doubles as a blog and as a playground for me to perfect the code that
comprises the site and to experiment with new methodologies and technologies.
You may find that things change quite drastically or strangely over time; this
is because I am always trying to learn new things and encorporate them into my
site or this Github repository. If you have any questions or suggestions, please
don’t hesitate to get in touch—via
[twitter](https://twitter.com/iamchrisburnell) or email—or open a new issue to
report bugs or suggestions.


## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md).


## Build Process

- [Jekyll](https://jekyllrb.com)
- [SCSS](http://sass-lang.com)
- [Autoprefixer](https://github.com/ai/autoprefixer)
- [Gulp](http://gulpjs.com)
- [PostCSS](http://postcss.org/)


## Layouts

```text
_layouts
├── feed.html
├── page.html
└── post.html
```


## Includes

```text
_includes
├── assets
│   ├── assets-body.html
│   ├── assets-head.html
│   └── svg-master.html
├── components
│   ├── banner.html
│   ├── comments-button.html
│   ├── comments.html
│   ├── content-list-item.html
│   ├── item-feed.html
│   ├── main-aside.html
│   ├── nav-primary.html
│   ├── nav-secondary.html
│   ├── nav-tertiary.html
│   ├── search-form.html
│   ├── widget-latest-articles.html
│   ├── widget-latest-links.html
│   ├── widget-latest-pens.html
│   ├── widget-latest-talks.html
│   └── widget-search.html
├── content
│   ├── code-toggle-bottom.html
│   ├── code-toggle-top.html
│   ├── codepen.html
│   ├── fragment-anchor.html
│   ├── heading.html
│   ├── img.html
│   ├── svg.html
│   └── twitter-card.html
└── layouts
    ├── footer.html
    └── header.html
```


## Sass Structure

```text
src/css
├── abstracts
│   ├── _functions.scss
│   ├── _mixins.scss
│   ├── _variables.scss
├── base
│   ├── _anchors.scss
│   ├── _buttons.scss
│   ├── _code.scss
│   ├── _content.scss
│   ├── _fonts.scss
│   ├── _forms.scss
│   ├── _page.scss
├── components
│   ├── _author.scss
│   ├── _code.scss
│   ├── _comments.scss
│   ├── _content-list.scss
│   ├── _content.scss
│   ├── _footer.scss
│   ├── _helpers.scss
│   ├── _icons.scss
│   ├── _logo.scss
│   ├── _media.scss
│   ├── _nav-primary.scss
│   ├── _nav-secondary.scss
│   ├── _nav-tertiary.scss
│   ├── _print.scss
│   ├── _search.scss
│   └── _widgets.scss
├── layout
│   ├── _aside.scss
│   ├── _content.scss
│   ├── _footer.scss
│   ├── _header.scss
│   └── _wrap.scss
├── pages
│   └── _styleguide.scss
├── vendors
│   ├── _include-media.scss
├── critical.scss
└── main.scss
```


## Generated

```text
_includes/generated
├── critical-css.html
├── loadcss.html
serviceworker.js
```


## Network

SSL and Wildcard DNS are supported by [CloudFlare](https://www.cloudflare.com/) 🙏


## License

The contents of this repository are licensed under the [GNU General Public License v3.0](LICENSE).
