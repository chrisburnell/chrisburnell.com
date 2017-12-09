## chrisburnell.com


The source code for [chrisburnell.com](https://chrisburnell.com/) 👌

![Version](https://img.shields.io/badge/version-3.1.0-blue.svg?style=flat-square)
[![License](https://img.shields.io/badge/license-GNU_GPLv3-blue.svg?style=flat-square)](LICENSE)

[![Build Status](https://img.shields.io/travis/chrisburnell/chrisburnell.com/master.svg?style=flat-square)](https://travis-ci.org/chrisburnell/chrisburnell.com)
[![Dependencies](https://img.shields.io/david/chrisburnell/chrisburnell.com.svg?maxAge=2592000&style=flat-square)](https://raw.githubusercontent.com/chrisburnell/chrisburnell.com/master/package.json)

[![CSS Size](http://img.badgesize.io/chrisburnell/chrisburnell.com/master/css/main.min.css?compression=gzip&style=flat-square&label=CSS&color=016fba)](https://raw.githubusercontent.com/chrisburnell/chrisburnell.com/master/css/main.min.css)
[![JS Size](http://img.badgesize.io/chrisburnell/chrisburnell.com/master/js/main.min.js?compression=gzip&style=flat-square&label=JS&color=cda741)](https://raw.githubusercontent.com/chrisburnell/chrisburnell.com/master/js/main.min.js)


### Table of Contents

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


### Description

My website doubles as a blog and as a playground for me to perfect the code that
comprises the site and to experiment with new methodologies and technologies.
You may find that things change quite drastically or strangely over time; this
is because I am always trying to learn new things and encorporate them into my
site or this Github repository. If you have any questions or suggestions, please
don’t hesitate to get in touch—via
[twitter](https://twitter.com/iamchrisburnell) or email—or open a new issue to
report bugs or suggestions.


### Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md).


### Build Process

- [Jekyll](https://jekyllrb.com)
- [SCSS](http://sass-lang.com)
- [Autoprefixer](https://github.com/ai/autoprefixer)
- [Gulp](http://gulpjs.com)
- [PostCSS](http://postcss.org/)


### Layouts

```text
_layouts
├── feed.html
├── page.html
└── post.html
```


### Includes

```text
_includes
├── assets
│   ├── assets-body.html
│   ├── assets-head.html
│   ├── assets-social.html
│   ├── yml-author.html
│   └── yml-head.html
├── components
│   ├── author.html
│   ├── banner.html
│   ├── buttons-list.html
│   ├── comments-button.html
│   ├── comments.html
│   ├── footer.html
│   ├── header.html
│   ├── item-content-list.html
│   ├── item-feed.html
│   ├── nav-primary.html
│   ├── search-form.html
│   ├── social-icons.html
│   ├── webmentions-button.html
│   ├── webmentions-form.html
│   ├── webmentions.html
│   ├── widget-latest-articles.html
│   ├── widget-latest-links.html
│   ├── widget-latest-notes.html
│   ├── widget-latest-pens.html
│   ├── widget-latest-talks.html
│   └── widget-search.html
├── content
│   ├── caniuse.html
│   ├── code-toggle-bottom.html
│   ├── code-toggle-top.html
│   ├── codepen.html
│   ├── endnote.html
│   ├── fragment-anchor.html
│   ├── heading.html
│   ├── img.html
│   ├── svg.html
│   └── twitter-card.html
└── generated
    ├── critical-css.html
    └── loadcss.html
```


### Sass Structure

```text
src/css
├── abstracts
│   ├── _css-variables.scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _variables.scss
├── base
│   ├── _anchor.scss
│   ├── _button.scss
│   ├── _code.scss
│   ├── _details.scss
│   ├── _figure.scss
│   ├── _fonts.scss
│   ├── _form.scss
│   ├── _heading.scss
│   ├── _list.scss
│   ├── _media.scss
│   ├── _miscellaneous.scss
│   ├── _page.scss
│   ├── _paragraph.scss
│   ├── _quote.scss
│   └── _table.scss
├── components
│   ├── _animation.scss
│   ├── _author.scss
│   ├── _banner.scss
│   ├── _buttons-list.scss
│   ├── _code.scss
│   ├── _comments.scss
│   ├── _content-list.scss
│   ├── _edit.scss
│   ├── _footer.scss
│   ├── _helpers.scss
│   ├── _icon.scss
│   ├── _lede.scss
│   ├── _logo.scss
│   ├── _media.scss
│   ├── _meta.scss
│   ├── _nav-primary.scss
│   ├── _print.scss
│   ├── _search.scss
│   ├── _social-icons.scss
│   ├── _terminology.scss
│   ├── _title.scss
│   ├── _webmentions.scss
│   └── _widget.scss
├── layout
│   ├── _aside.scss
│   ├── _content.scss
│   ├── _footer.scss
│   ├── _header.scss
│   ├── _main.scss
│   └── _wrap.scss
├── pages
│   └── _styleguide.scss
├── themes
│   ├── _christmas.scss
│   └── _halloween.scss
├── vendors
│   └── _include-media.scss
├── critical.scss
└── main.scss
```


### Generated

```text
_includes/generated
├── critical-css.html
├── loadcss.html
serviceworker.js
```


### Network

SSL and Wildcard DNS are supported by [CloudFlare](https://www.cloudflare.com/) 🙏


### License

The contents of this repository are licensed under the [GNU General Public License v3.0](LICENSE).
