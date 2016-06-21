# chrisburnell.com


The source code for [chrisburnell.com](https://chrisburnell.com/).

![Version](https://img.shields.io/badge/version-2.8.0-blue.svg?style=flat-square)[![Build Status](https://img.shields.io/travis/chrisburnell/chrisburnell.github.io/master.svg?style=flat-square)](https://travis-ci.org/chrisburnell/chrisburnell.github.io)


## Table of Contents

- [Title](#chrisburnellcom)
- [Description](#description)
- [Contributing](#contributing)
- [Build Process](#build-process)
- [Workflow](#workflow)
- [Layouts](#layouts)
- [Includes](#includes)
- [Sass Structure](#sass-structure)
- [Generated](#generated)
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


## Workflow

Building this website requires `Jekyll`, `Gulp`, and `PostCSS`.


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
│   ├── feed-item.html
│   ├── main-aside.html
│   ├── nav-primary.html
│   ├── nav-secondary.html
│   ├── nav-tertiary.html
│   ├── search-templates.html
│   ├── small-content-list-item.html
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
│   ├── _variables.branding.scss
│   ├── _variables.code.scss
│   └── _variables.global.scss
├── base
│   ├── _anchors.scss
│   ├── _buttons.scss
│   ├── _inputs.scss
│   ├── _page.scss
│   ├── _typography.code.scss
│   └── _typography.global.scss
├── components
│   ├── _article.scss
│   ├── _author.scss
│   ├── _code.scss
│   ├── _comments.scss
│   ├── _content-list.scss
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
│   ├── _small-content-list.scss
│   └── _widgets.scss
├── layout
│   ├── _article.scss
│   ├── _aside.scss
│   ├── _footer.scss
│   ├── _header.scss
│   └── _wrap.scss
├── pages
│   └── _styleguide.scss
├── vendors
│   ├── _box-sizing.scss
│   ├── _include-media.scss
│   └── _normalize.scss
├── critical.scss
└── main.scss
```


## Generated

```text
_includes/generated
├── critical-css.html
├── loadcss.html
└── typekit.html
serviceworker.min.js
```


## License

[![GitHub license](https://img.shields.io/badge/license-CC_BY--NC--SA_4.0-blue.svg?style=flat-square)](LICENSE)

The contents of this repository are licensed under the [CC-BY-NC-SA-4.0 Creative Commons License](LICENSE).
