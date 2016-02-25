# chrisburnell.com


The source code for [chrisburnell.com](https://chrisburnell.com/).


## Table of Contents

- [Title](#chrisburnellcom)
- [Version](#version-270)
- [Description](#description)
- [Contributing](#contributing)
- [Build Process](#build-process)
- [Workflow](#workflow)
- [Layouts](#layouts)
- [Includes](#includes)
- [Sass Structure](#sass-structure)
- [Generated](#generated)
- [License](#license)
- [Continuous Integration](#continuous-integration)


## version 2.7.0


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

- [Github Pages](http://pages.github.com)
- [Jekyll](http://jekyllrb.com)
- [SCSS](http://sass-lang.com)
- [Autoprefixer](https://github.com/ai/autoprefixer)
- [Gulp](http://gulpjs.com)
- [PostCSS](http://postcss.org/)


## Workflow

Building this website requires `Jekyll`, `Gulp`, and `PostCSS`.


## Layouts

```text
├── article.html
└── default.html
```


## Includes

```text
├── components
│   ├── amp-boilerplate.html
│   ├── assets-body.html
│   ├── assets-head.html
│   ├── banner.html
│   ├── comments.html
│   ├── head.html
│   ├── nav-primary.html
│   ├── nav-secondary.html
│   ├── nav-tertiary.html
│   ├── search-templates.html
│   └── svg.html
├── content
│   ├── code-toggle-button.html
│   ├── code-toggle-input.html
│   ├── codepen.html
│   └── heading.html
├── generated
│   ├── critical-css.html
│   ├── loadcss.html
│   └── typekit.html
├── layouts
│   ├── footer.html
│   └── header.html
└── main-aside
    ├── main-aside.html
    └── widgets
        ├── featured-pens.html
        ├── related-articles.html
        ├── search.html
        └── shared-links.html
```


## Sass Structure

```text
├── critical.scss
├── main.scss
├── base
│   ├── _anchors.scss
│   ├── _buttons.scss
│   ├── _inputs.scss
│   ├── _page.scss
│   ├── _typography.code.scss
│   └── _typography.global.scss
├── components
│   ├── _article.scss
│   ├── _articles-list.scss
│   ├── _aside-widgets.scss
│   ├── _author.scss
│   ├── _code.scss
│   ├── _comments.scss
│   ├── _footer.scss
│   ├── _icons.scss
│   ├── _logo.scss
│   ├── _media.scss
│   ├── _nav-primary.scss
│   ├── _nav-secondary.scss
│   ├── _nav-tertiary.scss
│   ├── _print.scss
│   ├── _search.scss
│   └── _small-articles-list.scss
├── layout
│   ├── _article.scss
│   ├── _aside.scss
│   ├── _footer.scss
│   ├── _header.scss
│   └── _wrap.scss
├── pages
│   └── _styleguide.scss
├── utils
│   ├── _functions.scss
│   ├── _helpers.scss
│   ├── _mixins.scss
│   ├── _variables.branding.scss
│   ├── _variables.code.scss
│   └── _variables.global.scss
└── vendors
    ├── _box-sizing.scss
    ├── _include-media.scss
    └── _normalize.scss
```


## Generated

```text
├── serviceworker.min.js
└── _includes
    └── generated
        ├── critical-css.html
        └── loadcss.html
```


## License

[![GitHub license](https://img.shields.io/badge/license-CC_BY--NC--SA_4.0-blue.svg)](LICENSE)

The contents of this repository are licensed under the [CC-BY-NC-SA-4.0 Creative Commons License](LICENSE).


## Continuous Integration

[ ![Codeship Status for chrisburnell/chrisburnell.github.io](https://codeship.com/projects/58777db0-797b-0133-2e51-7addd7fed507/status?branch=master)](https://codeship.com/projects/118727)

